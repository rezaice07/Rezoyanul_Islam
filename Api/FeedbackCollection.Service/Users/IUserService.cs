
using System.Collections.Generic;
using System.Threading.Tasks;
using FeedbackCollection.Data.Models;

namespace FeedbackCollection.Service.Users
{
    public interface IUserService
    {
        Task<User> GetDetailsByUsername(string username);
    }
}
