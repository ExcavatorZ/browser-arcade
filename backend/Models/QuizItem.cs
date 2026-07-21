namespace BrowserArcade.Api.Models
{
    public class QuizItem
    {
        public int Id {get; set;}
        public int Difficulty {get; set;}
        public string Question {get; set;} = "";
        public string Answer0 {get; set;} = "";
        public string Answer1 {get; set;} = "";
        public string Answer2 {get; set;} = "";
        public string Answer3 {get; set;} = "";
        public int CorrectIndex {get; set;}
    }
}

