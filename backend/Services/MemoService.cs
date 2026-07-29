using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

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

        public IEnumerable<MemoryGame> GetLeaderboard(string board)
        {
            IEnumerable<MemoryGame> memoGames = _db.MemoryGames.Where(memo => memo.BoardSize == board).Include(m => m.User).AsEnumerable().GroupBy(m => m.UserId).Select(m => m.OrderBy(g => g.Moves).First()).OrderBy(item => item.Moves).Take(10).ToList();
            return memoGames;
        }
    }
}
