FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
WORKDIR /app

COPY BrowserArcade.Api.csproj .
RUN dotnet restore BrowserArcade.Api.csproj

COPY /. ./
WORKDIR /app
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=backend /app/out ./
EXPOSE 5245
ENV ASPNETCORE_URLS=http://+:5245
ENTRYPOINT ["dotnet", "BrowserArcade.Api.dll"]