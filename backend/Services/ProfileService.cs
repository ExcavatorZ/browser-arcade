using BrowserArcade.Api.Models;

namespace BrowserArcade.Api.Services
{
    public class ProfileService
    {
        private readonly AppDbContext _db;
        public ProfileService(AppDbContext db)
        {
            _db = db;
        }

        public int GetQuizGames(string id)
        {
            int count = _db.QuizGames.Where(quiz => quiz.UserId == id).Count();

            return count;
        }
        public int GetMemoryGames(string id)
        {
            int count = _db.MemoryGames.Where(memo => memo.UserId == id).Count();

            return count;
        }
        public int GetSnakeGames(string id)
        {
            int count = _db.SnakeGames.Where(snake => snake.UserId == id).Count();

            return count;
        }
        public int GetInvaderGames(string id)
        {
            int count = _db.InvaderGames.Where(invader => invader.UserId == id).Count();

            return count;
        }
    }
}