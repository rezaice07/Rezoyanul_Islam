import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommentVoting } from 'src/app/shared/models/global/current-loggedin-user-model';
import { AppConstants } from 'src/app/shared/models/global/global-constant';
import { LoginResponse } from 'src/app/shared/models/global/login-response.model';
import { SearchFilter } from 'src/app/shared/models/global/search-filter.model';
import { PostService } from 'src/app/shared/services/posts/post-api.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-feedback-collection-report',
  templateUrl: './feedback-collection-report.component.html',
  styleUrls: ['./feedback-collection-report.component.css']
})
export class FeedbackCollectionReportComponent implements OnInit {
  private loginResponse: LoginResponse = <any>{};
  private postSearchFilter : SearchFilter =<any>{};
  private commentVotingModel = <any>{};
  private posts = [];
  loading: boolean = true;

  private pageNumber: any = 1;
  private pageSize: any = 2;
  private searchTerm = '';

  postComments: any[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private postService: PostService,
    private toastr: ToastrService,
    private storageService: StorageService) {
    this.initializeComponent();
  }

  ngOnInit(): void {
    this.filterPostsData(1);
  }

  commentVoting(commentId: any, votingType: any) {
    this.commentVotingModel = {
      userId: this.loginResponse.userId,
      commentId: commentId,
      votingType: votingType
    }

    this.postService.commentVotting(this.loginResponse.token, this.commentVotingModel).subscribe(data => {
      if (data.isSuccess) {
        this.filterPostsData(1);
      }
      else {
        this.loginResponse.isSuccess = false;
        this.loginResponse.message = 'Warning, Error on voting';
        this.notificationPrompt(this.loginResponse.message);
      }

    }, err => {
      let message = "There was an error while trying to login!";
      this.notificationPrompt(message);
    });
  }

  pageChanged(event){
    this.loading = true;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, pageIndex, pageSize);
  }

  getNextData(currentSize, offset, limit){
    this.pageNumber = offset===0?1:0;
    this.pageSize=limit;
    this.initializationSearchFilter();
    this.postService.getPostByFilter(
      this.loginResponse.token,
      this.postSearchFilter)
      .subscribe(data => {
        this.posts = data.model.posts;

        this.postComments.push(...this.posts);
        this.postComments.length = data.model.searchFilter.totalCount;
  
        this.dataSource = new MatTableDataSource<any>(this.postComments);
        this.dataSource.paginator = this.paginator;

        this.loading = false;            
      });
  }

  private filterPostsData(page: number) {
    this.pageNumber = page;
    this.initializationSearchFilter();
    this.postService.getPostByFilter(
      this.loginResponse.token,
      this.postSearchFilter)
      .subscribe(data => {
        this.posts = data.model.posts;

        this.postComments = this.posts;
        this.postComments.length = data.model.searchFilter.totalCount;
  
        this.dataSource = new MatTableDataSource<any>(this.postComments);
        this.dataSource.paginator = this.paginator;

        this.loading = false;
        //this.totalItem = model.SearchFilter.TotalCount;            
      });
  }

  private initializationSearchFilter() {
    this.postSearchFilter.searchTerm = this.searchTerm;
    this.postSearchFilter.pageSize=this.pageSize;
    this.postSearchFilter.pageNumber = this.pageNumber > 0 ? this.pageNumber : 1;
  }

  private initializeComponent() {
    //get login details
    this.getLoginDetails();
  }

  private getLoginDetails() {
    this.storageService
      .get(AppConstants.LOGIN_RESPONSE)
      .then(res => {
        this.loginResponse = res;
      }).catch(err => { });
  }

  private notificationPrompt(message: any) {
    this.toastr.warning(message);
  }
}
