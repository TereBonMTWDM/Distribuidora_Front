import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class RenovacionService {
  apiCobranza: string = environment.api.Cobranza + 'Renovacion/';

  constructor(private http: HttpClient , private authSvc: AuthService) { }


  GetRenovaciones() : Observable<any>{
    return this.http.get<Result>(`${this.apiCobranza}GetRenovaciones`).pipe(
      map(res => res as Result)
    );
  }
}
