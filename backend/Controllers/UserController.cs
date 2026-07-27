using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserService userService) : Controller
    {
        private readonly UserService _userService = userService;

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IResult> CreateUser([FromBody] UserRegistrationModel userRegistrationModel)
        {
            IResult result = await _userService.CreateUser(userRegistrationModel);

            return result;
        }
    }
}