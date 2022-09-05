import { Component, OnInit } from '@angular/core';
import { Empresa, Envase, Medida, Precio, Producto, Unidad } from 'src/app/model/modelos';
import {MatTableDataSource} from '@angular/material/table';
import { ServTiendaService } from 'src/app/service/serv-tienda.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private servTiendaService : ServTiendaService
  ) { }

  ngOnInit(): void {

  }
  

}
