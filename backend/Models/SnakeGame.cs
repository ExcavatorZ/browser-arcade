using System.ComponentModel.DataAnnotations.Schema;

namespace BrowserArcade.Api.Models
{
    public class SnakeGame
    {
        public int Id {get; set;}
        public int Score {get; set;}
        public DateTime Date {get; set;} = DateTime.Now;
        public string UserId {get; set;} = "";
        [ForeignKey("UserId")]
        public User User {get; set;} = null!;
    }
}