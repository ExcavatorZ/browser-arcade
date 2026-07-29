using System.Security.Claims;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnakeController : ControllerBase
    {
        private readonly SnakeService _snakeService;
        public SnakeController(SnakeService service)
        {
            _snakeService = service;
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> SaveSnakeGame([FromBody] int score)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _snakeService.SaveResult(score, userId);
            return Ok();
        }
    }
}