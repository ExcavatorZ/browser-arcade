namespace BrowserArcade.Api.DTOs
{
    public class ProfileDetailsDto
    {
        public int QuizGames {get; set;}
        public int MemoryGames {get; set;}
        public int SnakeGames {get; set;}
        public int InvaderGames {get; set;}
        public string CommonMemoSize {get; set;} = "";
        public string CommonQuizLength {get; set;} = "";
        public string CommonQuizDifficulty {get; set;} = "";
        public string CommonSnakeScore {get; set;} = "";
        public string SnakeHighScore {get; set;} = "";
        public string CommonInvaderScore {get; set;} = "";
        public string InvaderHighScore {get; set;} = "";
    }
}