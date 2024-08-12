import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Weather } from '../models/weather';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = environment.OPENWEATHER_API_KEY;
  private geoBaseUrl = 'https://api.openweathermap.org/geo/1.0/';
  private weatherBaseUrl = 'https://api.openweathermap.org/data/3.0/onecall';

  constructor(private http: HttpClient) { }

  getCoordinatesByCityName(cityName: string, limit: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('limit', limit.toString())
      .set('appid', this.apiKey);

    return this.http.get(this.geoBaseUrl + 'direct', { params });
  }

  getWeatherByCityName(cityName: string, units: string = 'metric', lang: string = 'en'): Observable<Weather> {
    return this.getCoordinatesByCityName(cityName).pipe(
      switchMap((coords: any) => {
        const lat = coords[0].lat;
        const lon = coords[0].lon;
        const params = new HttpParams()
          .set('lat', lat.toString())
          .set('lon', lon.toString())
          .set('units', units)
          .set('lang', lang)
          .set('exclude', 'minutely,alerts')
          .set('appid', this.apiKey);

        return this.getWeather(lat, lon, units, lang);
      })
    );
  }

  getCoordinatesByZipCode(zipCode: string, countryCode: string = 'TR'): Observable<any> {
    const params = new HttpParams()
      .set('zip', `${zipCode},${countryCode}`)
      .set('appid', this.apiKey);

    return this.http.get(this.geoBaseUrl + 'zip', { params });
  }

  getWeatherByZipCode(zipCode: string, countryCode: string = 'TR', units: string = 'metric', lang: string = 'en'): Observable<Weather> {
    return this.getCoordinatesByZipCode(zipCode, countryCode).pipe(
      switchMap((coords: any) => {
        const lat = coords.lat;
        const lon = coords.lon;
        return this.getWeather(lat, lon, units, lang);
      })
    );
  }

  getWeather(lat: number, lon: number, units: string = 'metric', lang: string = 'en'): Observable<Weather> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('units', units)
      .set('lang', lang)
      .set('exclude', 'minutely,alerts')
      .set('appid', this.apiKey);

    return this.http.get<any>(this.weatherBaseUrl, { params }).pipe(
      map((response: any) => {
        return new Weather(
          lat.toString(),
          lon.toString(),
          response.timezone,
          response.current.weather[0].description,
          response.current.temp,
          response.current.humidity,
          response.current.weather[0].main.toLowerCase(),
          response.current.weather[0].icon,
          response.current.wind_speed,
          response.daily,
          response.hourly
        );
      })
    );
  }
}