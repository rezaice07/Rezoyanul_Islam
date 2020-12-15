using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FeedbackCollection.Data.Models
{
    [Table("CommentVoting")]
    public class CommentVoting
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "User Id")]
        [Required(ErrorMessage = "{0} is Required")]
        public int UserId { get; set; }

        [Display(Name = "Comment Id")]
        [Required(ErrorMessage = "{0} is Required")]
        public int CommentId { get; set; }

        [Display(Name = "Voting Type")]
        [Required(ErrorMessage = "{0} is Required")]
        public int VotingType { get; set; }

        [Display(Name = "Created Date")]
        [Required(ErrorMessage = "{0} is Required")]
        public DateTime CreatedDate { get; set; }

        [Display(Name = "Updated Date")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("CommentId")]
        public virtual PostComment PostComment { get; set; }
    }
}
