using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FeedbackCollection.Data.Models
{
    [Table("Posts")]
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Post Description")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(3000, ErrorMessage = "Maximum length is {1}")]
        public string PostDescription { get; set; }

        [Display(Name = "User Id")]
        [Required(ErrorMessage = "{0} is Required")]
        public int UserId { get; set; }

        [Display(Name = "Created Date")]
        [Required(ErrorMessage = "{0} is Required")]
        public DateTime CreatedDate { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual ICollection<PostComment> PostComments { get; set; }        
    }
}
