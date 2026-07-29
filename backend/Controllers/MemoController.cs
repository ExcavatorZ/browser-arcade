using System.Security.Claims;
using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemoController : ControllerBase
    {
        private readonly MemoService _memoService;
        public MemoController(MemoService service)
        {
            _memoService = service;
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> SaveMemoryGame([FromBody] MemoryGameDto memoryGameDto)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _memoService.SaveResult(memoryGameDto, userId);
            return Ok();
        }
    }
}