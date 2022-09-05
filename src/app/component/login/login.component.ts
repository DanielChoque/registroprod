import { Component, OnInit } from '@angular/core';
import { DatosIniciales, Empresa, Envase, Medida, Precio, ServidorRespuesta, Unidad } from 'src/app/model/modelos';
import { ServTiendaService } from 'src/app/service/serv-tienda.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datosIni: DatosIniciales = new DatosIniciales()
  empresas: Empresa [] = []
  envases: Envase [] = []
  unidades: Unidad [] = []
  medidas: Medida [] = []
  precios: Precio []=[]
  preciosBusqueda: Precio []=[]
  respuesta: ServidorRespuesta = new  ServidorRespuesta()

  precioModelo: Precio = new Precio()
  empresaModelo: Empresa = new Empresa()
  envaseModelo: Envase  = new Envase()
  unidadeModelo: Unidad = new Unidad()
  medidaModelo: Medida = new Medida()

  codigo_barra = ""
  nombre = ""
  descripcion = ""
  peso = 0
  medida = 0
  envase = 0
  precio_venta = 0.0
  empresa = 13
  checkCod = false
  checkBuscarNombre = false
  
  codigo_barraE = ""
  nombreE = ""
  descripcionE = ""
  pesoE = 0
  medidaE = 0
  envaseE = 0
  precio_ventaE = 0.0
  empresaE = 0



  popup_g:boolean=true;
  alert:boolean=true;
  constructor(private servTiendaService : ServTiendaService) { }

  ngOnInit(): void {
    this.getDatosIniciales()
  }
  private getDatosIniciales(){
    this.datosIni = new DatosIniciales()
    this.servTiendaService.findAllDatosIniciales().subscribe(data => {
      this.datosIni = data;
      this.empresas = this.datosIni.empresas
      this.envases = this.datosIni.envases
      this.unidades = this.datosIni.unidades
      this.medidas = this.datosIni.medides
      console.log(this.datosIni)
      this.getPrecio()
    });
  }

  private getPrecio(){
    //Utilizamos el servicio inyectado para encontrar los usuarios
    this.servTiendaService.findAllPrecio().subscribe(data => {
    this.precios = data;
    this.preciosBusqueda = this.precios
    });
  }

  csvGenerar(){
    //Utilizamos el servicio inyectado para encontrar los usuarios
    this.servTiendaService.getcsvGenerar().subscribe(data => {
    });
  }

  verifSinCodigo(event: any){
    if(event.target.checked==true){ 
      this.checkCod = true
      this.codigo_barra = ""+this.precios.length
      console.log(this.codigo_barra)
      this.checkBuscarNombre=true
    }
    else{
      this.checkCod = false
      this.codigo_barra = ""
      this.checkBuscarNombre=false
    }

  }

  setMedidaModelo(value:any) {
    console.log('setMedidaModelo')
    console.log(value)
    this.medida = value
    this.medidaE = value
  }

  setEnvaseModelo(value:any){
    console.log('setEnvaseModelo')
    console.log(value)
    this.envase = value
    this.envaseE = value
  }
  setEmpresasModelo(value:any){
    console.log('setEmpresasModelo')
    console.log(value)
    this.empresa = value
    this.empresaE = value
  }

  setPrecioModelo(value:any){
    console.log('setPrecioModelo')
    console.log(value)
    //this.empresa = value
    this.precioModelo = new Precio()
    this.precios.forEach(element => {
      if (element.id==value){
        this.precioModelo=element
      }      
    });
    console.log(this.precioModelo)
    this.codigo_barraE = this.precioModelo.producto.cod
    this.nombreE = this.precioModelo.producto.nombre
    this.descripcionE = this.precioModelo.producto.descripcion
    this.pesoE = this.precioModelo.producto.peso
    this.precio_ventaE = this.precioModelo.precio_venta

    this.medidaE = this.precioModelo.producto.medida.id
    this.envaseE = this.precioModelo.producto.envase.id    
    this.empresaE = this.precioModelo.producto.empresa.id

    this.popup_g=false;
    this.alert=false;
  }
  guardarPrecio(){
    this.precioModelo = new Precio()
    this.precioModelo.producto.cod = this.codigo_barra
    this.precioModelo.producto.nombre = this.nombre
    this.precioModelo.producto.descripcion = this.descripcion
    this.precioModelo.producto.peso = this.peso
    this.precioModelo.precio_compra = this.precio_venta
    this.precioModelo.precio_venta = this.precio_venta
    this.precioModelo.cantidad = 1
    this.precioModelo.unidad.id = 1
    
    this.precioModelo.producto.empresa.id = this.empresa
    this.precioModelo.producto.envase.id = this.envase
    this.precioModelo.producto.medida.id = this.medida

    this.empresaModelo = new Empresa()
    this.envaseModelo = new Envase()
    //this.unidadeModelo: Unidad = new Unidad()
    this.medidaModelo = new Medida()

    console.log(this.precioModelo)
    /*this.servTiendaService.editarPrecio().subscribe(
      res=>{        
        var resp=JSON.parse(JSON.stringify(res))._body;        
        var ddd=JSON.parse(resp)
        this.initialOficina = ddd
        localStorage.setItem('oficina',JSON.stringify(this.initialOficina))
      },
      error=>console.log(error)
    )*/
    if (
    this.codigo_barra == "" ||
    this.codigo_barra == "" ||
    this.nombre == "" ||
    //this.descripcion == "" ||
    this.peso == 0 ||
    this.medida == 0 ||
    this.envase == 0 ||
    this.precio_venta == 0.0 ||
    this.empresa == 0) {
      alert("Llene todo los campos")

    }
    else{
      this.servTiendaService.agregarPrecio(this.precioModelo).subscribe(data => {
        this.respuesta = data;
        //this.ngOnInit()
        this.limpiar()
        });
  
    }
  }

  guardarEditarPrecio(){
    //this.precioModelo = new Precio()
    if(this.precioModelo.producto.cod!=this.codigo_barraE){
      this.precioModelo.producto.cod = this.codigo_barraE
    }
    
    this.precioModelo.producto.nombre = this.nombreE
    this.precioModelo.producto.descripcion = this.descripcionE
    this.precioModelo.producto.peso = this.pesoE
    this.precioModelo.precio_compra = this.precio_ventaE
    this.precioModelo.precio_venta = this.precio_ventaE
    
    //this.precioModelo.cantidad = 1
    //this.precioModelo.unidad.id = 1
    if(this.precioModelo.producto.empresa.id != this.empresaE){
      this.empresaModelo = new Empresa()
      this.empresas.forEach(element => {
        if(element.id==this.empresaE){
          this.precioModelo.producto.empresa = element
        }        
      });
      //this.precioModelo.producto.empresa = this.empresaModelo
      //this.precioModelo.producto.empresa.id = this.empresaE
    }    
    if(this.precioModelo.producto.envase.id != this.envaseE){
      this.envaseModelo = new Envase()
      this.envases.forEach(element => {
        if(element.id == this.envaseE){
          this.precioModelo.producto.envase = element
        }
      });
      //this.precioModelo.producto.envase = this.envaseModelo
      //this.precioModelo.producto.envase.id = this.envaseE
    }    
    if(this.precioModelo.producto.medida.id != this.medidaE){
      this.medidaModelo = new Medida()
      this.medidas.forEach(element => {
        if(element.id == this.medidaE){
          this.precioModelo.producto.medida = element
        }        
      });
      //this.precioModelo.producto.medida = this.medidaModelo
      //this.precioModelo.producto.medida.id = this.medidaE
    }

    console.log(this.precioModelo)

    this.servTiendaService.editarPrecio(this.precioModelo).subscribe(data => {
      this.respuesta = data;
      this.closeAlert()
      });
  }

  onChangeEvent(event :any){
    
    this.preciosBusqueda = this.precios
    this.preciosBusqueda = this.findMatches(this.codigo_barra,this.precios)
   // console.log(this.preciosBusqueda)

  }
  findMatches(wordToSearch:string, cities:Array<Precio>) {
    return cities.filter(place => {
        const regex = new RegExp(wordToSearch, 'gi');
        return place.producto.cod.match(regex) 
    })
  }

  onChangeEventNombre(event :any){
    if(this.checkBuscarNombre==true){
      this.preciosBusqueda = this.precios
      this.preciosBusqueda = this.findMatchesNombre(this.nombre,this.precios)
    }
    

  }

  findMatchesNombre(wordToSearch:string, cities:Array<Precio>) {
    return cities.filter(place => {
        const regex = new RegExp(wordToSearch, 'gi');
        return place.producto.nombre.match(regex) 
    })
  }

  limpiarRadio(){
    //var radio_precio = document.querySelector('input[type=radio][name=radio_precio]:checked')
    //radio_precio.checked = false;
    var radio: any
    radio = document.querySelector('input[type=radio][name=radio_precio]:checked');
    radio.checked = false;
  }

  closeAlert(){
    this.popup_g=true;
    this.alert=true;
    this.limpiarRadio()
    //this.router.navigate(['/']); 
  } 

  limpiar(){
    this.codigo_barra = ""
    this.codigo_barra = ""
    this.nombre = ""
    this.descripcion = ""
    this.peso = 0
    this.medida = 0
    this.envase = 0
    this.precio_venta = 0.0
    this.empresa = 0
    this.checkCod = false
    this.refresh()
  }
  refresh(): void {
    localStorage.clear();
    window.location.reload();
  }
}
