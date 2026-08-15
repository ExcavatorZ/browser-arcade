using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

public class QuizServiceTests
{
    [Fact]
    public async Task Test_GetQuestions()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        QuizService service = new QuizService(db);

        List<QuizItem> result = await service.GetQuestions(5, 2);

        Assert.Equal(5, result.Count);
        Assert.All(result, question => Assert.Equal(2, question.Difficulty));
    }

    [Fact]
    public void Test_SaveResult()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        QuizService service = new QuizService(db);

        QuizGameDto dto = new QuizGameDto
        {
            Score = 5,
            TotalQuestions = 5,
            Difficulty = 2,
            TimeTaken = 20
        };

        service.SaveResult(dto, "4");
        QuizGame result = db.QuizGames.Single();

        Assert.Equal(5, result.Score);
        Assert.Equal(5, result.TotalQuestions);
        Assert.Equal(2, result.Difficulty);
        Assert.Equal(20, result.TimeTaken);
        Assert.Equal("4", result.UserId);
        Assert.Equal(1, db.QuizGames.Count());
    }
}