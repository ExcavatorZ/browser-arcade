using System.ComponentModel.DataAnnotations.Schema;

namespace BrowserArcade.Api.Models
{
    public class MemoryGame
    {
        public int Id {get; set;}
        public int Moves {get; set;}
        public string BoardSize {get; set;} = "";
        public DateTime Date {get; set;} = DateTime.Now;
        public string UserId {get; set;} = "";
        [ForeignKey("UserId")]
        public User User {get; set;} = null!;
    }
}