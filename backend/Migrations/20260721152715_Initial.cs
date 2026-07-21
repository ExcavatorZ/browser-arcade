using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BrowserArcade.Api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Difficulty = table.Column<int>(type: "integer", nullable: false),
                    Question = table.Column<string>(type: "text", nullable: false),
                    Answer0 = table.Column<string>(type: "text", nullable: false),
                    Answer1 = table.Column<string>(type: "text", nullable: false),
                    Answer2 = table.Column<string>(type: "text", nullable: false),
                    Answer3 = table.Column<string>(type: "text", nullable: false),
                    CorrectIndex = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizItems", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "QuizItems",
                columns: new[] { "Id", "Answer0", "Answer1", "Answer2", "Answer3", "CorrectIndex", "Difficulty", "Question" },
                values: new object[,]
                {
                    { 1, "HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Management Language", "Home Tool Markup Language", 0, 1, "What does HTML stand for?" },
                    { 2, "//", "#", "/*", "--", 1, 1, "Which symbol is commonly used to start a comment in Python?" },
                    { 3, "integer", "float", "boolean", "character", 2, 1, "Which of these is a JavaScript data type?" },
                    { 4, "<link>", "<href>", "<a>", "<url>", 2, 1, "Which HTML tag is used to create a hyperlink?" },
                    { 5, ":", ";", ",", ".", 1, 1, "What symbol is commonly used to end a statement in C#?" },
                    { 6, "Loop", "Function", "Array", "Operator", 2, 1, "Which of these is used to store multiple values in a single variable in many programming languages?" },
                    { 7, "func", "define", "function", "def", 3, 1, "Which keyword is commonly used to define a function in Python?" },
                    { 8, "font-style", "text-color", "color", "text-style", 2, 1, "Which CSS property is used to change text color?" },
                    { 9, "=", "==", ":=", "!=", 1, 1, "Which symbol is used for equality comparison in many languages like JavaScript or C#?" },
                    { 10, "Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Color Style Syntax", 1, 1, "What does CSS stand for?" },
                    { 11, "<heading>", "<h1>", "<h6>", "<title>", 1, 1, "Which HTML tag is used to display the largest heading?" },
                    { 12, "Loop", "Variable", "Class", "Object", 0, 1, "Which programming structure repeats a block of code multiple times?" },
                    { 13, "Number", "String", "Boolean", "Array", 2, 1, "What is the result type of a comparison like 5 > 3?" },
                    { 14, "GET", "SELECT", "SHOW", "FETCH", 1, 1, "Which SQL command is used to retrieve data from a database?" },
                    { 15, "x", "*", "^", "#", 1, 1, "What symbol is used for multiplication in most programming languages?" },
                    { 16, "String", "Boolean", "Integer", "Float", 0, 1, "Which of these is used to store text data?" },
                    { 17, "Git", "HTML", "CSS", "SQL", 0, 1, "Which of the following is a version control system?" },
                    { 18, "const", "Python doesn't have a keyword for variables", "var", "new", 1, 1, "Which keyword is used to create a variable in Python?" },
                    { 19, "<picture>", "<img>", "<image>", "<src>", 1, 1, "Which HTML tag is used to insert an image?" },
                    { 20, "Structured Query Language", "Simple Query Language", "Structured Question Language", "System Query Logic", 0, 1, "What does SQL stand for?" },
                    { 21, "+", "&", "%", "//", 0, 1, "Which operator is used for addition?" },
                    { 22, "Python", "Java", "HTML", "C#", 2, 1, "Which of the following is NOT a programming language?" },
                    { 23, "repeat", "loop", "for", "iterate", 2, 1, "Which keyword is commonly used to create a loop in many languages?" },
                    { 24, "To store data", "To repeat code", "To style a webpage", "To compile code", 0, 1, "What is the purpose of a variable?" },
                    { 25, "<lb>", "<break>", "<br>", "<newline>", 2, 1, "Which HTML tag creates a line break?" },
                    { 26, "()", "[]", "{}", "<>", 1, 1, "Which bracket type is used for arrays in JavaScript?" },
                    { 27, "Integrated Development Environment", "Internal Development Engine", "Interactive Debug Engine", "Integrated Design Editor", 0, 1, "What does IDE stand for?" },
                    { 28, "ADD", "INSERT", "CREATE", "UPDATE", 1, 1, "Which SQL command is used to add new data into a table?" },
                    { 29, "Numbers only", "True or False", "Text only", "Dates", 1, 1, "What value does a Boolean variable store?" },
                    { 30, "<head>", "<meta>", "<body>", "<script>", 2, 1, "Which HTML element contains the visible page content?" },
                    { 31, "Store files", "Group reusable code", "Style webpages", "Connect databases", 1, 1, "What is the purpose of a function?" },
                    { 32, "Kotlin", "PHP", "Java", "CSS", 1, 1, "Which of the following languages' variables must contain a $ prefix?" },
                    { 33, "send", "result", "output", "return", 3, 1, "Which keyword is used to return a value from a function in many languages?" },
                    { 34, "DELETE", "REMOVE", "DROP", "CLEAR", 0, 1, "Which SQL command is used to remove data from a table?" },
                    { 35, "Converts code into machine code", "Runs a website", "Designs interfaces", "Stores files", 0, 1, "What does a compiler do?" },
                    { 36, "<ul>", "<ol>", "<li>", "<list>", 0, 1, "Which HTML tag is used to create an unordered list?" },
                    { 37, "Loop", "Conditional", "Variable", "Module", 1, 1, "Which programming concept allows code to make decisions?" },
                    { 38, "if", "when", "case", "check", 0, 1, "Which keyword is used for conditional logic in many languages?" },
                    { 39, ".js", ".java", ".script", ".jsx", 0, 1, "Which file extension is commonly used for JavaScript files?" },
                    { 40, "Styling websites", "Running operating systems", "Storing and managing data", "Writing code", 2, 1, "What is a database primarily used for?" },
                    { 41, "POST", "GET", "PUT", "DELETE", 1, 2, "Which HTTP method is typically used to retrieve data from a server?" },
                    { 42, "POST", "GET", "PATCH", "HEAD", 0, 2, "Which HTTP method is commonly used to create a new resource in REST APIs?" },
                    { 43, "200", "301", "404", "500", 2, 2, "Which HTTP status code means 'Not Found'?" },
                    { 44, "200", "404", "500", "403", 0, 2, "Which HTTP status code indicates a successful request?" },
                    { 45, "Remote Execution System Technology", "Representational State Transfer", "Resource Execution Standard Tool", "Remote Endpoint Service Transfer", 1, 2, "In REST APIs, what does REST stand for?" },
                    { 46, "Stateful sessions", "Stateless communication", "Binary protocols", "Encrypted payloads", 1, 2, "Which principle is central to REST APIs?" },
                    { 47, "Django", "React", "Laravel", "Spring Boot", 1, 2, "Which JavaScript library is commonly used for building user interfaces?" },
                    { 48, "Java", "TypeScript", "Python", "C#", 1, 2, "Angular is primarily written in which language?" },
                    { 49, "Mobile apps", "Web applications", "Operating systems", "Embedded systems", 1, 2, "ASP.NET is primarily used for what type of development?" },
                    { 50, "JavaScript", "PHP", "Python", "Ruby", 2, 2, "Django is a web framework written in which language?" },
                    { 51, "Node.js", "JRE", ".NET", "Next.js", 0, 2, "Express.js is commonly used with which runtime?" },
                    { 52, "Test the entire application workflow", "Test individual components or functions", "Test user interface design", "Test deployment pipelines", 1, 2, "What is the main purpose of unit testing?" },
                    { 53, "Single functions", "Application workflow from user perspective", "Database schema design", "Code formatting", 1, 2, "End-to-end testing primarily verifies what?" },
                    { 54, "Virtual machines", "Containerization", "Database hosting", "Web servers", 1, 2, "What does Docker primarily provide?" },
                    { 55, "Dockerfile", "docker.config", "container.json", "build.yaml", 0, 2, "Which file is commonly used to define how a Docker image is built?" },
                    { 56, "git fetch", "git clone", "git pull", "git init", 1, 2, "Which Git command downloads a repository from a remote server?" },
                    { 57, "Automatically deploy code to production", "Request that changes from one branch be reviewed and merged into another", "Delete unused branches", "Download changes from a remote repository", 1, 2, "What is the main purpose of a pull request in Git-based platforms?" },
                    { 58, "Delete a repository", "Manage parallel versions of code", "Upload code to GitHub", "Compile the project", 1, 2, "What is the purpose of 'git branch'?" },
                    { 59, "Promises", "Interfaces", "Generics", "Namespaces", 0, 2, "Which JavaScript feature allows functions to run asynchronously without blocking execution?" },
                    { 60, "JavaScript", "Python", "Java", "PHP", 2, 2, "Which of the following is a strongly typed language?" },
                    { 61, "Compile source code", "Handle requests before reaching route handlers", "Render HTML templates", "Store database records", 1, 2, "What is the purpose of middleware in web frameworks?" },
                    { 62, "PUT", "GET", "POST", "TRACE", 0, 2, "Which HTTP method is typically used to update an existing resource completely?" },
                    { 63, "200", "401", "404", "302", 1, 2, "Which HTTP status code indicates the user is not authorized?" },
                    { 64, "XML", "JSON", "CSV", "Binary", 1, 2, "Which format is most commonly used for REST API responses?" },
                    { 65, "Hooks", "Templates", "Modules", "Services", 0, 2, "Which React feature allows components to maintain internal state?" },
                    { 66, "Services", "Pipes", "Templates", "Directives", 0, 2, "Which Angular feature is used for dependency injection?" },
                    { 67, "Vitest", "Webpack", "Babel", "Prettier", 0, 2, "Which tool is commonly used for modern JavaScript unit testing?" },
                    { 68, "Cypress", "Prettier", "Babel", "Lodash", 0, 2, "Which tool is commonly used for browser-based end-to-end testing?" },
                    { 69, "Builds an image", "Starts a container from an image", "Deletes a container", "Uploads images", 1, 2, "What does 'docker run' do?" },
                    { 70, "Graph database", "Document database", "Relational database", "Key-value store", 2, 2, "Which database type stores data in tables with rows and columns?" },
                    { 71, "UPDATE", "MODIFY", "ALTER", "CHANGE", 0, 2, "Which SQL command modifies existing data in a table?" },
                    { 72, "ORDER BY", "GROUP BY", "WHERE", "LIMIT", 2, 2, "Which SQL clause filters query results?" },
                    { 73, "Application Programming Interface", "Application Process Integration", "Automated Program Interaction", "Advanced Protocol Interface", 0, 2, "What does API stand for?" },
                    { 74, "JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.decode()", 1, 2, "Which JavaScript function converts JSON text into an object?" },
                    { 75, "Encapsulation", "Inheritance", "Abstraction", "Polymorphism", 1, 2, "Which programming concept allows one class to inherit properties from another?" },
                    { 76, "200", "302", "404", "500", 3, 2, "Which HTTP status code indicates a server error?" },
                    { 77, "Continuous Integration", "Code Integration", "Central Integration", "Continuous Inspection", 0, 2, "What does CI in CI/CD stand for?" },
                    { 78, "docker show", "docker ps", "docker list", "docker containers", 1, 2, "Which Docker command lists running containers?" },
                    { 79, "git push", "git commit", "git add", "git fetch", 0, 2, "Which Git command sends commits to a remote repository?" },
                    { 80, "await", "async", "defer", "promise", 1, 2, "Which JavaScript keyword is used to define asynchronous functions?" },
                    { 81, "Authorization", "Cache-Control", "Content-Type", "Expires-At", 1, 3, "Which HTTP header is primarily used to control caching behavior?" },
                    { 82, "Reduces server memory usage", "Forces clients to load the latest version of a resource", "Encrypts cached files", "Deletes server cache automatically", 1, 3, "What does cache busting typically achieve?" },
                    { 83, "Changing HTTP method", "Adding version/hash to file names", "Using POST requests", "Clearing cookies", 1, 3, "Which technique is commonly used for cache busting static assets?" },
                    { 84, "Communication between containers on the same host", "Direct access to host kernel", "Cross-cloud deployment", "Persistent storage", 0, 3, "In Docker, what does a bridge network allow?" },
                    { 85, "Expose container port to host", "Limit CPU usage", "Bind volumes", "Set environment variables", 0, 3, "What is the purpose of Docker port mapping (e.g., -p 80:3000)?" },
                    { 86, "Server memory leaks", "Trust in authenticated user sessions", "Weak encryption", "SQL queries", 1, 3, "What vulnerability does CSRF exploit?" },
                    { 87, "Hashing passwords", "CSRF tokens", "Using GET requests", "Minifying JavaScript", 1, 3, "Which is a common mitigation against CSRF attacks?" },
                    { 88, "MVC uses controllers, Razor Pages are page-focused", "MVC cannot use models", "Razor Pages cannot access databases", "MVC is frontend only", 0, 3, "What is a key difference between ASP.NET MVC and Razor Pages?" },
                    { 89, "It returns data (e.g., JSON) instead of views", "It cannot use routing", "It only supports SOAP", "It runs only on Windows", 0, 3, "What distinguishes ASP.NET Web API from MVC?" },
                    { 90, "Supports advanced data types like JSONB", "Only supports small datasets", "Does not use SQL", "Runs only locally", 0, 3, "What is a common advantage of PostgreSQL over some other SQL databases?" },
                    { 91, "It only handles the UI layer", "It includes backend support", "It enforces strict project structure", "It replaces databases", 0, 3, "Why is React considered a library rather than a full framework?" },
                    { 92, "It enforces a specific project structure and patterns", "It supports only one browser", "It cannot use APIs", "It encourages TypeScript", 0, 3, "What does it mean that Angular is 'opinionated'?" },
                    { 93, "Django", "Laravel", "Express.js", "ASP.NET", 2, 3, "Which of the following is NOT a batteries-included framework?" },
                    { 94, "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN", 2, 3, "Which SQL JOIN returns only matching rows from both tables?" },
                    { 95, "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN", 1, 3, "Which SQL JOIN returns all rows from the left table and matching from the right?" },
                    { 96, "Measuring memory allocation", "Describing algorithm time complexity", "Defining syntax rules", "Compiling code", 1, 3, "What is Big-O notation used for?" },
                    { 97, "O(n)", "O(log n)", "O(n log n)", "O(1)", 1, 3, "What is the time complexity of binary search?" },
                    { 98, "Single-thread execution", "Multiple threads accessing shared data without synchronization", "Using constants", "Reading files sequentially", 1, 3, "Which scenario commonly causes a race condition?" },
                    { 99, "Cross-Origin Resource Sharing", "Cross Object Request System", "Client Origin Resource Sync", "Cross Output Routing Standard", 0, 3, "What does CORS stand for?" },
                    { 100, "Invalid HTML", "Cross-origin requests without proper headers", "Slow server response", "Missing CSS", 1, 3, "What triggers a CORS error in browsers?" },
                    { 101, "Expose ports", "Persist data outside containers", "Limit memory usage", "Run multiple containers", 1, 3, "What is the purpose of a Docker volume?" },
                    { 102, "null", "object", "undefined", "number", 1, 3, "What is the output of the following JavaScript code: console.log(typeof null);" },
                    { 103, "true", "false", "undefined", "error", 0, 3, "What is the output of: console.log(0 == false);" },
                    { 104, "true", "false", "undefined", "error", 1, 3, "What is the output of: console.log(0 === false);" },
                    { 105, "400", "401", "403", "429", 3, 3, "Which HTTP status code indicates 'Too Many Requests'?" },
                    { 106, "Content-Type", "Authorization", "Cache-Control", "Accept", 1, 3, "Which HTTP header is commonly used for authentication tokens?" },
                    { 107, "Database optimization", "Injecting malicious scripts into web pages", "Improving performance", "Encrypting data", 1, 3, "What is XSS primarily used for by attackers?" },
                    { 108, "String concatenation", "Parameterized queries", "Using GET requests", "Disabling validation", 1, 3, "Which practice helps prevent SQL injection?" },
                    { 109, "To block execution until the response arrives", "To handle asynchronous responses in a readable, sequential way", "To speed up network requests", "To avoid using HTTP methods", 1, 3, "Why is async/await commonly used when making backend API calls?" },
                    { 110, "Bubble sort", "Quick sort", "Linear search", "Selection sort", 1, 3, "Which sorting algorithm typically has O(n log n) complexity?" },
                    { 111, "true", "false", "undefined", "error", 0, 3, "What is the output of: console.log([] == false);" },
                    { 112, "true", "false", "undefined", "error", 1, 3, "What is the output of: console.log([] === false);" },
                    { 113, "no-store", "max-age=0", "immutable", "private", 1, 3, "Which HTTP caching directive forces revalidation with the server?" },
                    { 114, "bridge", "host", "overlay", "none", 1, 3, "Which Docker network mode gives a container direct access to the host network?" },
                    { 115, "3", "52", "NaN", "error", 0, 3, "What is the output of: console.log('5' - 2);" },
                    { 116, "7", "52", "NaN", "error", 1, 3, "What is the output of: console.log('5' + 2);" },
                    { 117, "Factory", "Singleton", "Observer", "Adapter", 1, 3, "Which concept ensures only one instance of a class exists?" },
                    { 118, "POST", "PUT", "PATCH", "CONNECT", 1, 3, "Which HTTP method is idempotent?" },
                    { 119, "NaN", "number", "undefined", "object", 1, 3, "What is the output of: console.log(typeof NaN);" },
                    { 120, "B-Tree only", "GIN index", "Flat index", "Heap index", 1, 3, "Which PostgreSQL feature allows indexing JSON data efficiently?" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizItems");
        }
    }
}
