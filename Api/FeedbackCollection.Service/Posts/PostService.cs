using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using FeedbackCollection.Data.Models;
using FeedbackCollection.Service.Encriptions;
using System.Collections.Generic;
using FeedbackCollection.Data.Utilities;

namespace FeedbackCollection.Service.Posts
{
    public class PostService : IPostService
    {
        #region Private Member
        private readonly FeedbackDbContext db;

        #endregion

        #region Ctor

        public PostService(FeedbackDbContext db)
        {
            this.db = db;
        }

        #endregion

        #region public Methods  

        public async Task<IEnumerable<Post>> GetListByFilter(PostSearchFilter filter)
        {
            try
            {
                var query = db.Posts
                     .Include(f => f.User)
                    .Include(f => f.PostComments)
                    .ThenInclude(y => y.CommentVotings)
                .Where(d =>
                filter.SearchTerm == null || filter.SearchTerm == "" ||
                d.PostDescription.Contains(filter.SearchTerm))
                ;

                filter.TotalCount = await query.CountAsync();

                var finalQuery = query.OrderByDescending(f=>f.CreatedDate);

                var posts = await finalQuery.Skip((filter.PageNumber - 1) * filter.PageSize)
                                            .Take(filter.PageSize)
                                            .ToListAsync();

                return posts;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> CommentVoting(CommentVoting commentVoting)
        {
            try
            {
                var upateCommentVoting = await db.CommentVotings
                    .FirstOrDefaultAsync(d => 
                                    d.UserId == commentVoting.UserId && 
                                    d.CommentId==commentVoting.CommentId
                                    );

                if (upateCommentVoting != null)
                {
                    commentVoting.UpdatedDate = DateTime.Now;
                    upateCommentVoting.VotingType = commentVoting.VotingType;
                    await db.SaveChangesAsync();

                    return true;
                }
               
                commentVoting.CreatedDate = DateTime.Now;
                db.CommentVotings.Add(commentVoting);
                await db.SaveChangesAsync();

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        #endregion
    }
}
