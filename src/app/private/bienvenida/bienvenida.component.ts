import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent {

}
