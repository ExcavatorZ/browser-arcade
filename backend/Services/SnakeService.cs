using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BrowserArcade.Api.Services
{
    public class SnakeService
    {
        private readonly AppDbContext _db;
        public SnakeService(AppDbContext db)
        {
            _db = db;
        }

        public void SaveResult(int score, string userId)
        {
            SnakeGame snakeGame = new SnakeGame
            {
                Score = score,
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                UserId = userId,
                User = _db.Users.Find(userId)!
            };

            _db.SnakeGames.Add(snakeGame);
            _db.SaveChanges();
        }

        public IEnumerable<SnakeGame> GetLeaderboard()
        {
            IEnumerable<SnakeGame> snakeGames = _db.SnakeGames.Include(s => s.User).AsEnumerable().GroupBy(s => s.UserId).Select(m => m.OrderByDescending(g => g.Score).First()).OrderByDescending(item => item.Score).Take(10).ToList();
            return snakeGames;
        }
    }
}
