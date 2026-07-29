using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;

namespace BrowserArcade.Api.Services
{
    public class MemoService
    {
        private readonly AppDbContext _db;
        public MemoService(AppDbContext db)
        {
            _db = db;
        }

        public void SaveResult(MemoryGameDto memoryGameDto, string userId)
        {
            MemoryGame memoryGame = new MemoryGame
            {
                Moves = memoryGameDto.Moves,
                BoardSize = memoryGameDto.BoardSize,
                Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                UserId = userId,
                User = _db.Users.Find(userId)!
            };

            _db.MemoryGames.Add(memoryGame);
            _db.SaveChanges();
        }

    }
}
