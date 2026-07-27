using System.ComponentModel.DataAnnotations.Schema;

namespace BrowserArcade.Api.Models
{
    public class QuizGame
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public int Difficulty { get; set; }
        public int TimeTaken { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string UserId {get; set;} = "";
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}