import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackCollectionReportComponent } from './components/feedback-collection-report/feedback-collection-report.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',canActivate: [AuthGuard], pathMatch: 'full', redirectTo: 'feedback-report' },
  { path: 'login', component: LogInComponent },
  { path: 'feedback-report',canActivate: [AuthGuard], component: FeedbackCollectionReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
