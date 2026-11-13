import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interface for the suggestion response
export interface Suggestion {
  machine_id: number;
  machine_name: string;
  slot_start: string;
  slot_end: string;
  usage_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class SuggestReservationService {

  private apiUrl = 'http://localhost:8000/api/machines/suggest-reservation/';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to get reservation suggestions
  getReservationSuggestions(
    printDuration: number,
    startDate: string,
    maxSuggestions: number = 10
  ): Observable<{ suggestions: Suggestion[] }> {
    const body = {
      print_duration: printDuration,
      start_date: startDate,
      max_suggestions: maxSuggestions
    };

    return this.http.post<{ suggestions: Suggestion[] }>(this.apiUrl, body);
  }
}
