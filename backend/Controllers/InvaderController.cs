using System.Security.Claims;
using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvaderController : ControllerBase
    {
        private readonly InvaderService _invaderService;
        public InvaderController(InvaderService service)
        {
            _invaderService = service;
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> SaveInvaderGame([FromBody] int score)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _invaderService.SaveResult(score, userId);
            return Ok();
        }

        [HttpGet("leaderboard")]
        public async Task<IEnumerable<InvaderGame>> GetInvaderLeaderboard()
        {
            IEnumerable<InvaderGame> result = _invaderService.GetLeaderboard();
            return result; 
        }
    }
}