import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(InventarioRoutingModule),
    MaterialModule,
    ReactiveFormsModule
    
  ],
  // exports: [RouterModule]
})
export class InventarioModule { }
