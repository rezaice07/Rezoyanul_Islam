using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FeedbackCollection.Data.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "First Name")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(100, ErrorMessage = "Maximum length is {1}")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        [StringLength(100, ErrorMessage = "Maximum length is {1}")]
        public string LastName { get; set; }

        [Display(Name = "Username")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(15, ErrorMessage = "Maximum length is {1}")]
        public string Username { get; set; }

        [Display(Name = "Password Hash")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(250, ErrorMessage = "Maximum length is {1}")]
        public string PasswordHash { get; set; }

        [Display(Name = "Password Salt")]
        [Required(ErrorMessage = "{0} is Required")]
        [StringLength(250, ErrorMessage = "Maximum length is {1}")]
        public string PasswordSalt { get; set; }

        [Display(Name = "Password Reset Token")]
        [StringLength(250, ErrorMessage = "Maximum length is {1}")]
        public string PasswordResetToken { get; set; }

        [Display(Name = "Address")]
        [StringLength(3000, ErrorMessage = "Maximum length is {1}")]
        public string Address { get; set; }

        [Display(Name = "Created Date")]
        [Required(ErrorMessage = "{0} is Required")]
        public DateTime CreatedDate { get; set; }      
        
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<PostComment> PostComments { get; set; }
        public virtual ICollection<CommentVoting> CommentVotings { get; set; }
    }
}
