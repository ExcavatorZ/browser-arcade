using BrowserArcade.Api.Models;

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

    }
}
