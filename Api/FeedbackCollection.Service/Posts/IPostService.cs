
using System.Collections.Generic;
using System.Threading.Tasks;
using FeedbackCollection.Data.Models;
using FeedbackCollection.Data.Utilities;

namespace FeedbackCollection.Service.Posts
{
    public interface IPostService
    {
        Task<IEnumerable<Post>> GetListByFilter(PostSearchFilter filter);
        Task<bool> CommentVoting(CommentVoting commentVoting);
    }
}
