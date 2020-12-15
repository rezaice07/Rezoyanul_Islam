using FeedbackCollection.Data.Models;
using FeedbackCollection.Data.Utilities;
using System.Collections.Generic;

namespace FeedbackCollection.Api.ViewModels.Posts
{
    public class PostListViewModel
    {
        public IEnumerable<Post> Posts { get; set; }
        public PostSearchFilter SearchFilter { get; set; }
    }
}
