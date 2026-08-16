using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.EntityFrameworkCore;

public class ProfileServiceTests
{
    private void AddQuizGame(AppDbContext db, int score, int totalQuestions, int difficulty, int timeTaken, string userId)
    {
        db.QuizGames.Add(new QuizGame
        {
            Score = score,
            TotalQuestions = totalQuestions,
            Difficulty = difficulty,
            TimeTaken = timeTaken,
            Date = DateTime.UtcNow,
            UserId = userId
        });
        db.SaveChanges();
    }

    private void AddMemoGame(AppDbContext db, int moves, string boardSize, string userId)
    {
        db.MemoryGames.Add(new MemoryGame
        {
            Moves = moves,
            BoardSize = boardSize,
            Date = DateTime.UtcNow,
            UserId = userId
        });
        db.SaveChanges();
    }

    private void AddGenericGame(AppDbContext db, string type, int score, string userId)
    {
        if (type == "snake")
        {
            db.SnakeGames.Add(new SnakeGame
            {
                Score = score,
                UserId = userId
            });
        } else if (type == "invader")
        {
            db.InvaderGames.Add(new InvaderGame
            {
                Score = score,
                UserId = userId
            });
        }
        db.SaveChanges();
    }

    [Fact]
    public async Task Test_Multiple_Quiz_Difficulty()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddQuizGame(db, 5, 5, 1, 10, "1");
        AddQuizGame(db, 5, 5, 2, 10, "1");
        AddQuizGame(db, 5, 5, 3, 10, "1");

        string result = service.GetCommonQuizDifficulty("1");

        Assert.Equal("Multiple", result);
    }

    [Fact]
    public async Task Test_Single_Quiz_Difficulty()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddQuizGame(db, 5, 5, 1, 10, "1");
        AddQuizGame(db, 5, 5, 3, 10, "1");
        AddQuizGame(db, 5, 5, 3, 10, "1");

        string result = service.GetCommonQuizDifficulty("1");

        Assert.Equal("Advanced", result);
    }

    [Fact]
    public async Task Test_Multiple_Quiz_Length()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddQuizGame(db, 5, 5, 1, 10, "1");
        AddQuizGame(db, 10, 10, 2, 20, "1");
        AddQuizGame(db, 15, 15, 3, 30, "1");

        string result = service.GetCommonQuizLength("1");

        Assert.Equal("Multiple", result);
    }

    [Fact]
    public async Task Test_Single_Quiz_Length()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddQuizGame(db, 5, 5, 1, 10, "1");
        AddQuizGame(db, 15, 15, 2, 30, "1");
        AddQuizGame(db, 15, 15, 3, 30, "1");

        string result = service.GetCommonQuizLength("1");

        Assert.Equal("15", result);
    }

    [Fact]
    public async Task Test_Multiple_Memo_Size()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddMemoGame(db, 20, "4x4", "1");
        AddMemoGame(db, 40, "6x6", "1");

        string result = service.GetCommonMemoSize("1");

        Assert.Equal("4x4 & 6x6", result);
    }

    [Fact]
    public async Task Test_Single_Memo_Size()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddMemoGame(db, 20, "4x4", "1");
        AddMemoGame(db, 20, "4x4", "1");

        string result = service.GetCommonMemoSize("1");

        Assert.Equal("4x4", result);
    }

    [Fact]
    public async Task Test_Snake_Highscore()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddGenericGame(db, "snake", 50, "1");
        AddGenericGame(db, "snake", 56, "1");
        AddGenericGame(db, "snake", 4, "1");
        AddGenericGame(db, "snake", 55, "1");

        string result = service.GetSnakeHighScore("1");

        Assert.Equal("56", result);
    }

    [Fact]
    public async Task Test_Snake_Average_Score()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddGenericGame(db, "snake", 41, "1");
        AddGenericGame(db, "snake", 51, "1");
        AddGenericGame(db, "snake", 61, "1");
        AddGenericGame(db, "snake", 71, "1");

        string result = service.GetCommonSnakeScore("1");

        Assert.Equal("56", result);
    }

    [Fact]
    public async Task Test_Invader_Highscore()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddGenericGame(db, "invader", 67, "1");
        AddGenericGame(db, "invader", 0, "1");
        AddGenericGame(db, "invader", 66, "1");
        AddGenericGame(db, "invader", 69, "1");

        string result = service.GetInvaderHighScore("1");

        Assert.Equal("69", result);
    }

    [Fact]
    public async Task Test_Invader_Average_Score()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        AddGenericGame(db, "invader", 54, "1");
        AddGenericGame(db, "invader", 64, "1");
        AddGenericGame(db, "invader", 74, "1");
        AddGenericGame(db, "invader", 84, "1");

        string result = service.GetCommonInvaderScore("1");

        Assert.Equal("69", result);
    }

    [Fact]
    public async Task Test_All_No_Games_Played()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);

        string[] results = [
            service.GetCommonQuizDifficulty("1"),
            service.GetCommonQuizLength("1"),
            service.GetCommonMemoSize("1"),
            service.GetSnakeHighScore("1"),
            service.GetCommonSnakeScore("1"),
            service.GetInvaderHighScore("1"),
            service.GetCommonInvaderScore("1")
        ];

        for (int i = 0; i < results.Length; i++)
        {
            Assert.Equal("No games played.", results[i]);
        }
    }

}