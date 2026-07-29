using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BrowserArcade.Api.Models;
using BrowserArcade.Api.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BrowserArcade.Api.Services
{
    
    public class UserService(UserManager<User> userManager)
    {
        public async Task<IResult> CreateUser([FromBody] UserRegistrationModel userRegistrationModel)
        {

            User user = new User()
            {
                UserName = userRegistrationModel.UserName,
                Email = userRegistrationModel.Email,
            };

            IdentityResult result = await userManager.CreateAsync(user, userRegistrationModel.Password);

            if (result.Succeeded) {
                return Results.Ok(result);
            }
            else {
                return Results.BadRequest(result);
            }
        }

        public async Task<IResult> LoginUser([FromBody] string email, string password)
        {
            User? user = await userManager.FindByEmailAsync(email);
                if (user != null && await userManager.CheckPasswordAsync(user, password))
                {
                    SymmetricSecurityKey signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        "TemporarySecretKeyContaining32+Characters"
                        ));
                    ClaimsIdentity claims = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, user.Id)
                        });

                    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = claims,
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(
                            signInKey, SecurityAlgorithms.HmacSha256Signature
                        )
                    };
                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                    SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    string token = tokenHandler.WriteToken(securityToken);
                    return Results.Ok(new {token});
                }
                else
                {
                    return Results.BadRequest(new {message = "Email or password is incorrect."});
                }
        }
    }
}

