using System.Security.Claims;
using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;
        public QuizController(QuizService service)
        {
            _quizService = service;
        }

        [HttpGet]
        public async Task<IEnumerable<QuizItem>> GetQuizItems(int amount, int difficulty)
        {
            return await _quizService.GetQuestions(amount, difficulty);
        }

        [Authorize]
        [HttpPost("save")]
        public async Task<ActionResult> SaveQuizGame([FromBody] QuizGameDto quizGameDto)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _quizService.SaveResult(quizGameDto, userId);
            return Ok();
        }
    }
}