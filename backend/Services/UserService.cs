using BrowserArcade.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Services
{
    
    public class UserService(UserManager<User> userManager)
    {
        private readonly UserManager<User> _userManager = userManager;

        public async Task<IResult> CreateUser([FromBody] UserRegistrationModel userRegistrationModel)
        {

            User user = new User()
            {
                UserName = userRegistrationModel.UserName,
                Email = userRegistrationModel.Email,
            };

            IdentityResult result = await _userManager.CreateAsync(user, userRegistrationModel.Password);

            if (result.Succeeded) {
                return Results.Ok(result);
            }
            else {
                return Results.BadRequest(result);
            }
        }
    }
}

