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
}