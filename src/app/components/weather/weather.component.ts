import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() location: string = '';
  currentWeather: Weather | null = null;
  backgroundImageUrl: string = '';
  units: string = 'metric';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    if (this.location) {
      this.getWeather();
    } else {
      this.getUserLocation();
    }
  }

  ngOnChanges(): void {
    if (this.location) {
      this.getWeather();
    }
  }

  getWeather() {
    if (this.location) {
      this.location = this.location.trim(); // Trim any leading/trailing spaces
  
      // Check if the location is a number (likely a ZIP code)
      const isZipCode = /^\d+$/.test(this.location);
  
      if (isZipCode) {
        this.weatherService
          .getWeatherByZipCode(this.location, 'TR', this.units)
          .subscribe(
            data => {
              this.currentWeather = data;
              this.location = data.timezone;
              this.setBackgroundImage();
            },
            error => {
              console.error('Error fetching weather data:', error);
              this.currentWeather = null;
            }
          );
      } else {
        this.weatherService
          .getWeatherByCityName(this.location, this.units)
          .subscribe(
            data => {
              this.currentWeather = data;
              this.location = data.timezone;
              this.setBackgroundImage();
            },
            error => {
              console.error('Error fetching weather data:', error);
              this.currentWeather = null;
            }
          );
      }
    } else {
      this.getUserLocation();
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeather(lat, lon, this.units).subscribe(
          data => {
            this.currentWeather = data;
            this.location = data.timezone;
            this.setBackgroundImage();
          },
          error => {
            console.error('Error fetching weather data:', error);
            this.currentWeather = null;
          }
        );
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  setBackgroundImage() {
    if (this.currentWeather) {
      const weatherCondition = this.currentWeather.type;
      switch (weatherCondition) {
        case 'clear':
          this.backgroundImageUrl = 'url(assets/images/clear-sky.png)';
          break;
        case 'clouds':
          this.backgroundImageUrl = 'url(assets/images/cloudy.png)';
          break;
        case 'rain':
        case 'drizzle':
          this.backgroundImageUrl = 'url(assets/images/rainy.png)';
          break;
        case 'thunderstorm':
          this.backgroundImageUrl = 'url(assets/images/thunderstorm.png)';
          break;
        case 'snow':
          this.backgroundImageUrl = 'url(assets/images/snowy.png)';
          break;
        default:
          this.backgroundImageUrl = 'url(assets/images/default-weather.jpg)';
          break;
      }
    }
  }

  toggleUnits() {
    this.units = this.units === 'metric' ? 'imperial' : 'metric';
    if(this.currentWeather?.timezone != "") {
      this.location = this.currentWeather?.timezone.split("/")[1] ?? "";
    }
    this.getWeather();
  }
}