using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace FeedbackCollection.Data.Models
{
    [Table("Comments")]
    public class PostComment
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Post Id")]
        [Required(ErrorMessage = "{0} is Required")]
        public int PostId { get; set; }

        [Display(Name = "User Id")]
        [Required(ErrorMessage = "{0} is Required")]
        public int UserId { get; set; }

        [Display(Name = "Comment")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(3000, ErrorMessage = "Maximum length is {1}")]
        public string Comment { get; set; }

        [Display(Name = "Created Date")]
        [Required(ErrorMessage = "{0} is Required")]
        public DateTime CreatedDate { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }

        public virtual ICollection<CommentVoting> CommentVotings { get; set; }


        [NotMapped]
        public int TotalLikes => CommentVotings.Count(f => f.VotingType == 1);

        [NotMapped]
        public int TotalDisLikes => CommentVotings.Count(f => f.VotingType == 2);
    }
}
