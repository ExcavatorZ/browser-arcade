using BrowserArcade.Api.Models;

namespace BrowserArcade.Api.Services
{
    public class ProfileService
    {
        private readonly AppDbContext _db;
        public ProfileService(AppDbContext db)
        {
            _db = db;
        }

        public int GetQuizGames(string id)
        {
            int count = _db.QuizGames.Where(quiz => quiz.UserId == id).Count();

            return count;
        }
        public int GetMemoryGames(string id)
        {
            int count = _db.MemoryGames.Where(memo => memo.UserId == id).Count();

            return count;
        }
        public int GetSnakeGames(string id)
        {
            int count = _db.SnakeGames.Where(snake => snake.UserId == id).Count();

            return count;
        }
        public int GetInvaderGames(string id)
        {
            int count = _db.InvaderGames.Where(invader => invader.UserId == id).Count();

            return count;
        }
        public string GetCommonQuizDifficulty(string id)
        {
            var grouped = _db.QuizGames.Where(q => q.UserId == id).GroupBy(q => q.Difficulty).Select(g => new { Difficulty = g.Key, Count = g.Count() }).OrderByDescending(g => g.Count).ToList();

            if (grouped.Count == 0)
            {
                return "No games played.";
            }

            int max = grouped.First().Count;

            var topDifficulties = grouped.Where(g => g.Count == max).Select(g => g.Difficulty).ToList();

            if (topDifficulties.Count > 1)
            {
                return "Multiple";
            }

            switch (topDifficulties[0])
            {
                case 1:
                    return "Beginner";
                case 2:
                    return "Intermediate";
                case 3:
                    return "Advanced";
                default:
                    return "Unknown";
            }
        }
        public string GetCommonQuizLength(string id)
        {
            var grouped = _db.QuizGames.Where(q => q.UserId == id).GroupBy(q => q.TotalQuestions).Select(g => new { Length = g.Key, Count = g.Count() }).OrderByDescending(g => g.Count).ToList();

            if (grouped.Count == 0)
            {
                return "No games played.";
            }

            int max = grouped.First().Count;

            var topLength = grouped.Where(g => g.Count == max).Select(g => g.Length).ToList();

            if (topLength.Count > 1)
            {
                return "Multiple";
            }

            return topLength[0].ToString();
        }
        public string GetCommonMemoSize(string id)
        {
            var result = _db.MemoryGames.Where(memo => memo.UserId == id).GroupBy(m => m.BoardSize).Select(m => new { Board = m.Key, Count = m.Count() }).OrderByDescending(m => m.Count).ToList();

            if (result.Count == 0)
            {
                return "No games played.";
            }
            else if (result.Count == 1)
            {
                return result[0].Board;
            }

            if (result[0].Count > 0 && result[0].Count > result[1].Count)
            {
                return result[0].Board;
            }
            else if (result[1].Count > 0 && result[1].Count > result[0].Count)
            {
                return result[1].Board;
            }

            return result[0].Board + " & " + result[1].Board;
        }
        public string GetSnakeHighScore(string id)
        {
            if (_db.SnakeGames.Where(snake => snake.UserId == id).ToList().Count < 1)
            {
                return "No games played.";
            }

            SnakeGame result = _db.SnakeGames.Where(snake => snake.UserId == id).OrderByDescending(s => s.Score).First();

            return result.Score.ToString();
        }
        public string GetCommonSnakeScore(string id)
        {
            List<SnakeGame> allGames = _db.SnakeGames.Where(snake => snake.UserId == id).ToList();

            if (allGames.Count < 1)
            {
                return "No games played.";
            }

            int counter = 0;

            for (int i = 0; i < allGames.Count; i++)
            {
                counter += allGames[i].Score;
            }

            return (counter / allGames.Count).ToString();
        }
        public string GetInvaderHighScore(string id)
        {
            if (_db.InvaderGames.Where(invader => invader.UserId == id).ToList().Count < 1)
            {
                return "No games played.";
            }

            InvaderGame result = _db.InvaderGames.Where(invader => invader.UserId == id).OrderByDescending(s => s.Score).First();

            return result.Score.ToString();
        }
        public string GetCommonInvaderScore(string id)
        {
            List<InvaderGame> allGames = _db.InvaderGames.Where(invader => invader.UserId == id).ToList();

            if (allGames.Count < 1)
            {
                return "No games played.";
            }            

            int counter = 0;

            for (int i = 0; i < allGames.Count; i++)
            {
                counter += allGames[i].Score;
            }

            return (counter / allGames.Count).ToString();
        }
    }
}