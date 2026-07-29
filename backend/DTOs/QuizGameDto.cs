namespace BrowserArcade.Api.DTOs
{
    public class QuizGameDto
    {
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public int Difficulty { get; set; }
        public int TimeTaken { get; set; }
    }
}