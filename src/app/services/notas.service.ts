import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  apiCobranza: string = environment.api.Cobranza + 'Nota';
  constructor(private http: HttpClient) { }

  Save(nota: Nota) : Observable<Result>{
    return this.http.post<Result>(`${this.apiCobranza}/Save`, nota).pipe(
      map(res => res as Result)
    );
  }

  
}
