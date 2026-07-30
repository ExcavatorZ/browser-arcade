using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BrowserArcade.Api.Services
{
    public class InvaderService
    {
        private readonly AppDbContext _db;
        public InvaderService(AppDbContext db)
        {
            _db = db;
        }

        public void SaveResult(int score, string userId)
        {
            InvaderGame invaderGame = new InvaderGame
            {
                Score = score,
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                UserId = userId,
                User = _db.Users.Find(userId)!
            };

            _db.InvaderGames.Add(invaderGame);
            _db.SaveChanges();
        }

        public IEnumerable<InvaderGame> GetLeaderboard()
        {
            IEnumerable<InvaderGame> invaderGames = _db.InvaderGames.Include(s => s.User).AsEnumerable().GroupBy(s => s.UserId).Select(m => m.OrderByDescending(g => g.Score).First()).OrderByDescending(item => item.Score).Take(10).ToList();
            return invaderGames;
        }

    }
}
