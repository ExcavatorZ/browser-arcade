using System.Text.Json;
using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public class UserServiceTests
{
    private async Task AddDefaultUser(UserManager<User> manager)
    {
        User user  = new User
        {
            UserName = "mushroom",
            Email = "mushroom@mycelium.com",
        };
        await manager.CreateAsync(user, "mush123!");
    }

    private ServiceProvider CreateServices()
    {
        ServiceCollection services = new ServiceCollection();

        services.AddLogging();

        services.AddDbContext<AppDbContext>(options =>
            options.UseInMemoryDatabase(Guid.NewGuid().ToString()));

        services
            .AddIdentityCore<User>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddSignInManager();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
            options.User.RequireUniqueEmail = true;
        });

        return services.BuildServiceProvider();
    }

    [Fact]
    public async Task Test_CreateUser_Success()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        UserService service = new UserService(manager, db);

        UserRegistrationModel user = new UserRegistrationModel
        {
            UserName = "mushroom",
            Email = "mushroom@mycelium.com",
            Password = "mush123!"
        };

        IResult result = await service.CreateUser(user);
        User? createdUser = await manager.FindByEmailAsync("mushroom@mycelium.com");

        Assert.NotNull(createdUser);
        Assert.Equal("mushroom", createdUser.UserName);
    }

    [Fact]
    public async Task Test_CreateUser_Invalid_Password()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        UserService service = new UserService(manager, db);

        UserRegistrationModel user = new UserRegistrationModel
        {
            UserName = "fungus",
            Email = "fungus@mycelium.com",
            Password = "funguy123"
        };

        IResult result = await service.CreateUser(user);

        Assert.IsType<BadRequest<IdentityResult>>(result);
    }

    [Fact]
    public async Task Test_CreateUser_Existing_Email()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        UserService service = new UserService(manager, db);

        UserRegistrationModel user0 = new UserRegistrationModel
        {
            UserName = "mushroom",
            Email = "mushroom@mycelium.com",
            Password = "mush123!"
        };

        IResult result0 = await service.CreateUser(user0);

        UserRegistrationModel user1 = new UserRegistrationModel
        {
            UserName = "fungus",
            Email = "mushroom@mycelium.com",
            Password = "mush123!"
        };

        IResult result1 = await service.CreateUser(user1);

        Assert.IsType<BadRequest<IdentityResult>>(result1);
    }

    [Fact]
    public async Task Test_LoginUser_Success()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        await AddDefaultUser(manager);

        UserService service = new UserService(manager, db);

        IResult result = await service.LoginUser("mushroom@mycelium.com", "mush123!");

        IValueHttpResult okResult = Assert.IsType<IValueHttpResult>(result, exactMatch: false);

        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task Test_LoginUser_Nonexisting_Email()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        await AddDefaultUser(manager);

        UserService service = new UserService(manager, db);

        IResult result = await service.LoginUser("fungus@mycelium.com", "mush123!");

        IValueHttpResult notFoundResult = Assert.IsType<IValueHttpResult>(result, exactMatch: false);

        string value = JsonSerializer.Serialize(notFoundResult.Value);

        Assert.Equal("""{"message":"Email not registered."}""", value);
    }

    [Fact]
    public async Task Test_LoginUser_Incorrect_Password()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        await AddDefaultUser(manager);

        UserService service = new UserService(manager, db);

        IResult result = await service.LoginUser("mushroom@mycelium.com", "funguy123!");

        IValueHttpResult badRequestResult = Assert.IsType<IValueHttpResult>(result, exactMatch: false);

        string value = JsonSerializer.Serialize(badRequestResult.Value);

        Assert.Equal("""{"message":"Incorrect password."}""", value);
    }

    [Fact]
    public async Task Test_Get_UserName()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();

        db.Database.EnsureCreated();

        db.Users.Add(new User
        {
            Id = "1",
            UserName = "mushroom",
            Email = "mushroom@mycelium.com"
        });

        db.SaveChanges();

        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();
        UserService service = new UserService(manager, db);

        string userName = service.GetUserName("1");
        Assert.Equal("mushroom", userName);
    }
}