import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenusByRolService {
rol: string;
  menuAll = '../assets/json/menuAll.json'
  menuCobrVida = '../assets/json/menuCobranzaVida.json'
  menuCobrAutos = '../assets/json/menuCobranzaAutos.json'

  constructor(private http: HttpClient) { }

  getMenus(email: string){
    this.rol;

    switch(true){
      case email.includes('tereorozco.bon'):  
      case email.includes('terebon.desarrollo'):
      case email.includes('eugenia.vel29'):
      case email.includes('addysul2'):
      // case 'adriana':
        this.rol = 'all';
        break;
      case email.includes('katyalpz6'):
        this.rol = 'cobrVida';
        break;

      case email.includes('damaris'):
        this.rol = 'cobrAutos';
        break;

      default:
        break;
    }

    switch(this.rol){
      case 'all':
        return this.http.get(this.menuAll);

      case 'cobrVida':
        return this.http.get(this.menuCobrVida);

      case 'cobrAutos':
        return this.http.get(this.menuCobrAutos);

      default:
        break;
    }
    
  }
}
