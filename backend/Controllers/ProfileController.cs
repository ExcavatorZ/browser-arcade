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

        [HttpGet("details")]
        public ProfileDetailsDto GetProfileDetails()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            ProfileDetailsDto details = new ProfileDetailsDto
            {
                QuizGames = _profileService.GetQuizGames(userId),
                MemoryGames = _profileService.GetMemoryGames(userId),
                SnakeGames = _profileService.GetSnakeGames(userId),
                InvaderGames = _profileService.GetInvaderGames(userId),
                CommonMemoSize = _profileService.GetCommonMemoSize(userId),
                CommonQuizLength = _profileService.GetCommonQuizLength(userId),
                CommonQuizDifficulty = _profileService.GetCommonQuizDifficulty(userId),
                CommonSnakeScore = _profileService.GetCommonSnakeScore(userId),
                SnakeHighScore = _profileService.GetSnakeHighScore(userId),
                CommonInvaderScore = _profileService.GetCommonInvaderScore(userId),
                InvaderHighScore = _profileService.GetInvaderHighScore(userId)

            };

            return details;
        }
    }
}