// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable
@Injectable({
    providedIn: 'root'
})

// Class
export class CurrencyService {
    /**
     * Constructor
     */
    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * Getting an array of currencies
     */
    getCurrency(): Observable<any> {
        return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    };
}
