using FeedbackCollection.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace FeedbackCollection.Service
{
    public class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options)
            : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<CommentVoting> CommentVotings { get; set; }
    }
}
