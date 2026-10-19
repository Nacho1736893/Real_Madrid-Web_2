const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "real_madrid"
});

conexion.connect((error) => {
    if (error) {
        console.error("Error al conectar con MySQL:", error);
        return;
    }

    console.log("Conectado a MySQL correctamente");
});

app.post("/mensajes", (req, res) => {

    const { nombre, email, comentario } = req.body;

    const sql = `
        INSERT INTO mensajes (nombre, email, comentario)
        VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, email, comentario],
        (error, resultado) => {

            if (error) {
                console.error(error);
                return res.status(500).json({
                    mensaje: "Error al guardar el mensaje"
                });
            }

            res.json({
                mensaje: "Mensaje guardado correctamente"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});