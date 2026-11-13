import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiAuthService {
    private apiUrl = 'https://your-api-endpoint.com/auth'; 

    constructor(private http: HttpClient) {}

  
}
