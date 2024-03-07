import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyService {
    private key = '1';
    constructor(private http: HttpClient) { }

    getData(latitude: number, longitude: number): Observable<any> {
        return interval(5000).pipe(switchMap(() => this.getWeather(latitude, longitude)));
    }

    getWeather(latitude: number, longitude: number): Observable<any> {
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}`;
        return this.http.get(api).pipe(take(1));
    }
}