# Angular Weather App with Forecast

This project is an Angular-based weather dashboard that provides current weather conditions, a five-day forecast, and an hourly forecast for any given city or zip code. The application is designed with a user-friendly interface, offering features like unit conversion between Celsius and Fahrenheit and error handling for invalid inputs.

## Features

- Current Weather Conditions: Displays temperature, humidity, wind speed, weather description, and an icon representing the current weather.
-	Five-Day Forecast: Provides daily high and low temperatures, along with weather icons for the next five days.
-	Hourly Forecast: Offers an hourly breakdown of the weather for the next 24 hours.
-	Temperature Unit Toggle: Users can switch between Celsius and Fahrenheit.
-	Interactive UI: The dashboard is designed to be visually appealing, responsive, and easy to navigate, with clear and organized weather information.
-	Error Handling: Handles invalid city names or zip codes gracefully, displaying appropriate error messages.
-	Loading States: Displays loading indicators while fetching data.

## Tech Stack

-	Angular 18: The latest Angular version is used to build a robust, modular, and maintainable application.
-	PrimeNG Components: Leveraged for building a modern and responsive UI.
-	OpenWeatherMap API: Utilized to fetch weather data.

## Installation
To run this project locally, follow these steps:

1.	Clone the repository:

```bash
git clone https://github.com/ecamlioglu/angular-weather-app-w-forecast.git
cd angular-weather-app-w-forecast
```

2.	Install Dependencies:

```bash
yarn // I'm using yarn on this project.
```

3.	Set up environment variables

Create your environment ts under the src/environment/*. And add your API key.

And enjoy to your weather app.

## Deployment

The application is configured to be deployed to Azure Static Web Apps. A GitHub Actions workflow automates the build and deployment process.

### To deploy:

1.	Set up your environment variables in the Azure portal, including the OpenWeatherMap API key.
2.	Push your code to GitHub, and the GitHub Actions workflow will handle the rest.

## Contributing

Contributions are welcome! Please follow these steps:

1.	Fork the repository.
2.	Create a new branch (git checkout -b feature/YourFeature).
3.	Commit your changes (git commit -m 'Add YourFeature').
4.	Push to the branch (git push origin feature/YourFeature).
5.	Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-	OpenWeatherMap API for providing weather data.
-	PrimeNG for UI components.
