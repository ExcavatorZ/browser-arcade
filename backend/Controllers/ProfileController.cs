using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BrowserArcade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _profileService;
        private readonly UserManager<User> _userManager;
        public ProfileController(ProfileService service, UserManager<User> manager)
        {
            _profileService = service;
            _userManager = manager;
        }

        [Authorize]
        [HttpGet("overview/{userName}")]
        public async Task<ActionResult<ProfileOverviewDto>> GetProfileOverview(string userName)
        {
            User? user = await _userManager.FindByNameAsync(userName);
            
            if (user == null)
            {
                return NotFound();
            }

            ProfileOverviewDto overView = new ProfileOverviewDto
            {
                QuizGames = _profileService.GetQuizGames(user.Id),
                MemoryGames = _profileService.GetMemoryGames(user.Id),
                SnakeGames = _profileService.GetSnakeGames(user.Id),
                InvaderGames = _profileService.GetInvaderGames(user.Id)

            };

            return overView;
        }

        [Authorize]
        [HttpGet("details/{userName}")]
        public async Task<ActionResult<ProfileDetailsDto>> GetProfileDetails(string userName)
        {
            User? user = await _userManager.FindByNameAsync(userName);
            
            if (user == null)
            {
                return NotFound();
            }

            ProfileDetailsDto details = new ProfileDetailsDto
            {
                QuizGames = _profileService.GetQuizGames(user.Id),
                MemoryGames = _profileService.GetMemoryGames(user.Id),
                SnakeGames = _profileService.GetSnakeGames(user.Id),
                InvaderGames = _profileService.GetInvaderGames(user.Id),
                CommonMemoSize = _profileService.GetCommonMemoSize(user.Id),
                CommonQuizLength = _profileService.GetCommonQuizLength(user.Id),
                CommonQuizDifficulty = _profileService.GetCommonQuizDifficulty(user.Id),
                CommonSnakeScore = _profileService.GetCommonSnakeScore(user.Id),
                SnakeHighScore = _profileService.GetSnakeHighScore(user.Id),
                CommonInvaderScore = _profileService.GetCommonInvaderScore(user.Id),
                InvaderHighScore = _profileService.GetInvaderHighScore(user.Id)
            };

            return details;
        }
    }
}