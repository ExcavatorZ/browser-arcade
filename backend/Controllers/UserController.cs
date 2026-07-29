using BrowserArcade.Api.DTOs;
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

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IResult> LoginUser([FromBody] LoginRequest request)
        {
            IResult result = await _userService.LoginUser(request.Email, request.Password);

            return result;
        }
    }
}