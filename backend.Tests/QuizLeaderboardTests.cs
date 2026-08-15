using BrowserArcade.Api.Models;
using Microsoft.EntityFrameworkCore;

public class QuizLeaderboardTests
{
    private AppDbContext CreateDb()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        AppDbContext db = new AppDbContext(options);

        db.Database.EnsureCreated();

        db.Users.AddRange(
            new User
            {
                UserName = "chanterelle",
                Id = "1"
            },
            new User
            {
                UserName = "psilocybin",
                Id = "2"
            },
            new User
            {
                UserName = "fly agaric",
                Id = "3"
            },
            new User
            {
                UserName = "portobello",
                Id = "4"
            },
            new User
            {
                UserName = "morel",
                Id = "5"
            }
        );

        db.SaveChanges();

        return db;
    }

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

    [Fact]
    public async Task Test_Leaderboard_Ranking()
    {
        AppDbContext db = CreateDb();

        QuizService service = new QuizService(db);

        AddQuizGame(db, 9, 10, 2, 10, "1");
        AddQuizGame(db, 8, 10, 2, 10, "2");
        AddQuizGame(db, 10, 10, 2, 10, "3");

        IEnumerable<QuizGame> leaderboard = service.GetLeaderboard(10, 2);

        Assert.Equal(3, leaderboard.Count());
        Assert.Equal("fly agaric", leaderboard.ElementAt(0).User.UserName);
        Assert.Equal("chanterelle", leaderboard.ElementAt(1).User.UserName);
        Assert.Equal("psilocybin", leaderboard.ElementAt(2).User.UserName);
    }

    [Fact]
    public async Task Test_Leaderboard_Amount_Filter()
    {
        AppDbContext db = CreateDb();

        QuizService service = new QuizService(db);

        AddQuizGame(db, 10, 10, 2, 10, "4");
        AddQuizGame(db, 5, 5, 2, 10, "5");

        IEnumerable<QuizGame> leaderboard = service.GetLeaderboard(10, 2);

        Assert.Single(leaderboard);
        Assert.Equal("portobello", leaderboard.First().User.UserName);
    }

    [Fact]
    public async Task Test_Leaderboard_Difficulty_Filter()
    {
        AppDbContext db = CreateDb();

        QuizService service = new QuizService(db);

        AddQuizGame(db, 10, 10, 2, 10, "4");
        AddQuizGame(db, 5, 10, 3, 10, "5");

        IEnumerable<QuizGame> leaderboard = service.GetLeaderboard(10, 3);

        Assert.Single(leaderboard);
        Assert.Equal("morel", leaderboard.First().User.UserName);
    }

    [Fact]
    public async Task Test_Leaderboard_Only_Uses_Best_Score_Per_User()
    {
        AppDbContext db = CreateDb();

        QuizService service = new QuizService(db);

        AddQuizGame(db, 5, 10, 2, 10, "1");
        AddQuizGame(db, 6, 10, 2, 10, "1");
        AddQuizGame(db, 4, 10, 2, 10, "1");

        IEnumerable<QuizGame> leaderboard = service.GetLeaderboard(10, 2);

        Assert.Single(leaderboard);
        Assert.Equal(6, leaderboard.First().Score);
    }
}