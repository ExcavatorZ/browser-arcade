using BrowserArcade.Api.Models;

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

    }
}
