using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

public class QuizService
{
    private readonly AppDbContext _db;
    public QuizService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<QuizItem>> GetQuestions(int amount, int difficulty)
    {
        List<QuizItem> quizItems =  await _db.QuizItems.Where(item => item.Difficulty == difficulty).OrderBy(item => Guid.NewGuid()).Take(amount).ToListAsync();

        return quizItems;
    }

    public void SaveResult(QuizGameDto quizGameDto, string userId)
    {
        QuizGame quizGame = new QuizGame
        {
            Score = quizGameDto.Score,
            TotalQuestions = quizGameDto.TotalQuestions,
            Difficulty = quizGameDto.Difficulty,
            TimeTaken = quizGameDto.TimeTaken,
            Date = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
            UserId = userId,
            User = _db.Users.Find(userId)!
        };

        _db.QuizGames.Add(quizGame);
        _db.SaveChanges();
    }

    public IEnumerable<QuizGame> GetLeaderboard(int amount, int difficulty)
    {
        IEnumerable<QuizGame> quizGames = _db.QuizGames.Where(quiz => quiz.TotalQuestions == amount && quiz.Difficulty == difficulty).Include(q => q.User).AsEnumerable().GroupBy(q => q.UserId).Select(m => m.OrderByDescending(g => g.Score).First()).OrderByDescending(item => item.Score).ThenBy(g => g.TimeTaken).Take(10).ToList();
        return quizGames;
    }
}