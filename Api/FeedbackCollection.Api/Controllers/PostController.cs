using FeedbackCollection.Api.ViewModels.Posts;
using FeedbackCollection.Data.Models;
using FeedbackCollection.Data.Utilities;
using FeedbackCollection.Service.Posts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace FeedbackCollection.Api.Controllers
{
    [Route("api/[controller]")]    
    public class PostController : CoreController
    {
        #region Private Methods

        private readonly IPostService _postService;
        private readonly IConfiguration _configuration;

        #endregion

        #region ctor

        public PostController(
            IConfiguration configuration,
            IPostService postService
            )
        {
            _postService = postService;
            _configuration = configuration;
        }

        #endregion

        #region List

        //POST api/post/getpostsbyfilter 
        [Route("getpostsbyfilter")]
        [HttpPost]
        public async Task<IActionResult> GetPostByFilter([FromForm] PostSearchFilter filter)
        {
            var posts = await _postService.GetListByFilter(filter);

            var currentUser = CurrentLoginUser;

            var model = new PostListViewModel
            {
                Posts = posts,
                SearchFilter = filter
            };

            return Ok(new
            {
                model = model
            });
        }

        #endregion

        #region Votting

        //POST api/post/commentvotting 
        [Route("commentvotting")]
        [HttpPost]
        public async Task<ActionResult> CommentVotting([FromBody] CommentVoting model)
        {
            var currentUser = CurrentLoginUser;

            if (currentUser == null)
                return Ok(new { IsSuccess = false, Message = "There was an error while trying to like/dislike this comment" });

            //let's register the class
            var isVoted = await _postService.CommentVoting(model);

            if (!isVoted)
                return Ok(new { IsSuccess = false, Message = "There was an error while trying to like/dislike this comment!" });

            return Ok(new { IsSuccess = true, Message = "successful" });
        }

        #endregion        
    }
}
