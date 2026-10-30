const express = require("express")
const mysql = require("mysql2")
const bodyParser=require("body-parser")
// librerias 

const app=express() // crea la aplicacion express ; //OBJETO QUE SE UTILIZA PARA CONFIGURAR SERVIDOR

const PUERTO = 3000;// INDICA EL PUERTO DONDE ESCUCHARA LA APK

app.use(bodyParser.json()) // app.use : registra un middleware osea procesa solicitudes
// bodyParser.json  : interpreta la solicitud si contiene json 

const conexion = mysql.createConnection({
    host: "localhost",
    database: "apibd",
    port: "3306",
    user: "root",
    password: "James@2020"
})
app.listen(PUERTO, () => {
    console.log("Servidor ejecutandose en el puerto " + PUERTO)
})
// ENCIENDE EL SERVIDOR ESCUCH-+A SOLICITUD DEL PUERTO 3000

conexion.connect(error =>{// INTENTA CONECTARSE ALA BASE DE DATOS Y EL ERROR => RECIBE  EL ERROR SI LA CONEXION FALLA

    if(error) throw error // SI OCURRE ERROR LO LANZA
    console.log("Conexion exitosa ala BD")// SI NO HAY ERROR MUESTRA EL MENSAJE

})
app.get("/",(req,res)=>{// define una ruta que responde a solicitudes get // "/" REPRESENTA LA RUTA PRINCIPAL
    res.send("Bienvenido  a mi API")//  req : contiene la informacion de la solicitud recibida
    // res: permite enviar la respuesta al client
    //res.send():envia el texto al navegador
})
app.get("/productos",(rep,res)=>{// ejecuta el codigo en esa ruta
        
    const query ="SELECT * FROM producto"//

    conexion.query(query,(error,rpta)=>{
       // error : contiene el error , si ocurre alguno
        // rpta : contiene las filas devueltas por la consulta cuando funciona bien :D
        
        const obj = {} // crea un objeto sin propiedades 

        if(rpta.length>0){ //indica las filas que devuelve la consulta >0 significa que existe al menos una fila

            obj.listaProductos =rpta
            // guarda las filas en la propiedad 
            res.json(obj)// envia el objeto como JSON al cliente
        }else{
            res.json("no hay registros")
        }
    })


})
app.get("/categorias",(rep,res)=>{
    const query ="SELECT * FROM categorias";

    conexion.query(query,(error,rpta)=>{

        if(error)throw error ;
            const obj ={}
            if(rpta.length>0){
                res.json(obj);
            }else{
                res.json("no hay c ategoria registrada")
            }
            
        

    })
})// buscador
app.get("productos/categoria/:id",(rep,res)=>{
    const idcategoria=req.params.id;
    const query ="SELECT * FROM producto WHERE idcategoria = ?"

    conexion.query(query,[id], (error, rpta)=>{
        if(error) throw error;
        const obj = {}
        if(rpta.length>0){
            obj.productoPorCategoria=rpta;
            res.json(obj);
        }else{
            res.json("no hay productos registrados")
        }

    })

})