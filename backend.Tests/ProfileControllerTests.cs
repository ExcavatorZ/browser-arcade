using BrowserArcade.Api.Controllers;
using BrowserArcade.Api.DTOs;
using BrowserArcade.Api.Models;
using BrowserArcade.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public class ProfileControllerTests
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

    private static ServiceProvider CreateServices()
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
    public async Task Test_Get_Profile_Overview()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);
        ProfileController controller = new ProfileController(service, manager);

        await AddDefaultUser(manager);

        ActionResult<ProfileOverviewDto> result = await controller.GetProfileOverview("mushroom");

        Assert.NotNull(result.Value);
    }

    [Fact]
    public async Task Test_No_Profile_Overview()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);
        ProfileController controller = new ProfileController(service, manager);

        await AddDefaultUser(manager);

        ActionResult<ProfileOverviewDto> result = await controller.GetProfileOverview("fungus");

        Assert.Null(result.Value);
    }

    [Fact]
    public async Task Test_Get_Profile_Details()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);
        ProfileController controller = new ProfileController(service, manager);

        await AddDefaultUser(manager);

        ActionResult<ProfileDetailsDto> result = await controller.GetProfileDetails("mushroom");

        Assert.NotNull(result.Value);
    }

    [Fact]
    public async Task Test_No_Profile_Details()
    {
        ServiceProvider provider = CreateServices();

        AppDbContext db = provider.GetRequiredService<AppDbContext>();
        UserManager<User> manager = provider.GetRequiredService<UserManager<User>>();

        db.Database.EnsureCreated();

        ProfileService service = new ProfileService(db);
        ProfileController controller = new ProfileController(service, manager);

        await AddDefaultUser(manager);

        ActionResult<ProfileDetailsDto> result = await controller.GetProfileDetails("fungus");

        Assert.Null(result.Value);
    }
}