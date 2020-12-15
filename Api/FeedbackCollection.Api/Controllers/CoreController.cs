using FeedbackCollection.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FeedbackCollection.Api.Controllers
{    
    [ApiController]
    public class CoreController : ControllerBase
    {
        public User CurrentLoginUser
        {
            get
            {
                var userModel = new User();

                if (!User.Identity.IsAuthenticated)
                    return userModel;

                var claimsIdentity = (ClaimsIdentity)User.Identity;
                var userClaims = claimsIdentity.Claims;

                if (userClaims == null)
                    return new User();

                userModel.Id = Convert.ToInt32(claimsIdentity.Claims.FirstOrDefault(f => f.Type == "Id").Value);               
                userModel.FirstName = claimsIdentity.Claims.FirstOrDefault(f => f.Type == "FirstName").Value;
                userModel.LastName = claimsIdentity.Claims.FirstOrDefault(f => f.Type == "LastName").Value;
                userModel.Username = claimsIdentity.Claims.FirstOrDefault(f => f.Type == "Username").Value;

                return userModel;
            }
        }
    }
}
