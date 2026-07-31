using System.Security.Claims;
using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _profileService;
        public ProfileController(ProfileService service)
        {
            _profileService = service;
        }

        [HttpGet("overview")]
        public ProfileOverviewDto GetProfileOverview()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            ProfileOverviewDto overView = new ProfileOverviewDto
            {
                QuizGames = _profileService.GetQuizGames(userId),
                MemoryGames = _profileService.GetMemoryGames(userId),
                SnakeGames = _profileService.GetSnakeGames(userId),
                InvaderGames = _profileService.GetInvaderGames(userId)

            };

            return overView;
        }
    }
}