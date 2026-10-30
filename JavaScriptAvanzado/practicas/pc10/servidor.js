const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PUERTO = 3000;

app.use(bodyParser.json());

const conexion = mysql.createConnection({
    host: "localhost",
    database: "apibd",
    port: "3306",
    user: "root",
    password: "James@2020"
});

app.listen(PUERTO, () => {
    console.log("Servidor corriendo en el puerto " + PUERTO);
});

conexion.connect(error => {
    if (error) throw error;
    console.log("Conexión exitosa a la base de datos");
});

// Ruta corregida en plural: /productos/stock/critico/:limite
app.get("/productos/stock/critico/:limite", (req, res) => {
     console.log("¡ENTRÓ A LA RUTA GET!");
    const limite = req.params.limite;
    const query = "SELECT * FROM producto WHERE stock <= ?";

    conexion.query(query, [limite], (error, rpta) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({
            stockCritico: rpta
        });
    });
});

app.post("/productos/nuevo", (req, res) => {
    const { nombre, stock, precio, idcategoria } = req.body;

    const query1 = "INSERT INTO producto (nombre, stock, precio, idcategoria) VALUES (?, ?, ?, ?)";

    conexion.query(query1, [nombre, stock, precio, idcategoria], (error, rpta) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            mensaje: "¡Producto registrado con éxito!",
            idGenerado: rpta.insertId
        });
    });
});