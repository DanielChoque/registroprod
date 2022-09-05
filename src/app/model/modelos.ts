export class Modelos {
}
export class Unidad {
    id = 0
    nombre = ""
    //unidades = 0
    modificado = ""
}

export class Medida {
    id = 0
    nombre = ""
    modificado = ""
}

export class Envase {
    id = 0
    nombre = ""
    modificado = ""
}

export class Empresa {
    id = 0
    nit = 0
    nombre = ""
    elaboradopor = ""
    modificado = ""
}

export class Producto {
    id = 0
    cod = ""
    nombre = ""
    descripcion = ""
    peso = 0.0
    medida: Medida = new Medida()
    envase: Envase = new Envase()
    empresa: Empresa = new Empresa()
    modificado = ""
    volumen = 0.0
}

export class Precio {
    id = 0
    unidad: Unidad = new Unidad()
    producto: Producto = new Producto()
    cantidad = 0
    precio_venta = 0.0
    precio_compra = 0.0
    modificado = ""
    //cod = ""
}

export class DatosIniciales{
    empresas: Empresa [] = []
    envases: Envase [] = []
    unidades: Unidad [] = []
    medides: Medida [] = []
}

export class ServidorRespuesta{
    respuesta : boolean = false
}
