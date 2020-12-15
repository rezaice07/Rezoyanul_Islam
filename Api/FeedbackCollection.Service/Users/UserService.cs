using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using FeedbackCollection.Data.Models;
using FeedbackCollection.Service.Encriptions;

namespace FeedbackCollection.Service.Users
{
    public class UserService : IUserService
    {
        #region Private Member
        private readonly FeedbackDbContext db;

        #endregion

        #region Ctor

        public UserService(FeedbackDbContext db)
        {
            this.db = db;
        }

        #endregion

        #region public Methods  

        public async Task<User> GetDetailsByUsername(string username)
        {
            try
            {
                var user = await db.Users
                .FirstOrDefaultAsync(d => d.Username == username);

                return user;
            }
            catch
            {
                return null;
            }
        }

        #endregion
    }
}
