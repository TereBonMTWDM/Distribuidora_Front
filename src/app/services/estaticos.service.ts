import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstaticosService {
  polizasJson = '../assets/json/polizas.json';
  companiasJson = '../assets/json/companias.json';
  tiposMensajesJson = '../assets/json/tiposMensajes.json';

  constructor(private http: HttpClient) { 
  }

  getProductosTest() {return this.http.get(this.polizasJson)}

  GetCompanias() {return this.http.get(this.companiasJson)}

  GetTiposMensajes() {return this.http.get(this.tiposMensajesJson)}
}
