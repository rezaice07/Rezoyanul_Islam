
#region Usings
using FeedbackCollection.Api.ViewModels.Accounts;
using FeedbackCollection.Data.Models;
using FeedbackCollection.Service.Encriptions;
using FeedbackCollection.Service.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
#endregion

namespace FeedbackCollection.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        #region Private Member

        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        #endregion

        #region Ctor

        public AccountController(
            IConfiguration configuration,
            IUserService userService
            )
        {
            _userService = userService;
            _configuration = configuration;
        }
        #endregion

        #region Login

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromForm] LoginViewModel model)
        {
            //get user info by email
            var user = await _userService.GetDetailsByUsername(model.Username);

            if (user == null)
                return Ok(new { IsSuccess = false, Message = "Incorrect email or password.!" });

            //check valid user
            if (!ValidateLoggedInUser(model, user))
            {
                var message = "Incorrect email or password, Please try again.";
                return Ok(new { IsSuccess = false, Message = message });
            }

            //creating custom claims
            var claims = new ClaimsIdentity( new [] {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Username", user.Username),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", string.IsNullOrWhiteSpace(user.LastName)?"":user.LastName)
                } );

            //get signing key
            var signinKey = new SymmetricSecurityKey(
              Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]));

            //get token expire
            int expiryInMinutes = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]);


            //generating a new jwt token with additional information
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                /*
                issuer: _configuration["Jwt:Site"],
                audience: _configuration["Jwt:Site"],
                */
                Expires = DateTime.UtcNow.AddMinutes(expiryInMinutes),
                SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
            };

            //generating a new jwt token with additional information

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            /*
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);

            */

            /*
            var token = new JwtSecurityToken(
              claims: claims,
              issuer: _configuration["Jwt:Site"],
              audience: _configuration["Jwt:Site"],
              expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
              signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
            );

            */

            return Ok(
              new
              {
                  access_token = new JwtSecurityTokenHandler().WriteToken(token),
                  expiration = token.ValidTo,
                  user= user,
                  isSuccess = true
              });
        }

        #endregion

        #region Private Methods

        private bool ValidateLoggedInUser(LoginViewModel model, User user)
        {
            return user.PasswordHash == EncryptionService.HashPassword(model.Password, user.PasswordSalt);
        }

        #endregion
    }
}
