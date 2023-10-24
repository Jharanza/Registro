const express = require('express');

const mysql = require('mysql');

const app = express();

let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'usuarios',
    user: 'root',
    password: ''
});

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('registro');
});

app.post("/validar", function(req, res) {
    const datos = req.body;

    const DNI = datos.dni;
    const Nombres = datos.nom;
    const direccion = datos.dir;
    const correo = datos.correo;
    const telefono = datos.telf;

    const buscar = 'SELECT * FROM informacion WHERE dni = ? or email = ?';

    conexion.query(buscar, [DNI, correo], function (error, row) {
        if (error) {
            throw error;
        } else {
            if (row.length > 0) {
                console.log('El DNI o el correo están duplicados');
            } else {
                const registrar = 'INSERT INTO informacion (dni, full_name, address1, email, phone) VALUES (?, ?, ?, ?, ?)';

                conexion.query(registrar, [DNI, Nombres, direccion, correo, telefono], function(error) {
                    if (error) {
                        throw error;
                    } else {
                        console.log('Registro exitoso')
                    }
                });
            }
        }
    });

    
})

app.listen(3000, function() {
    console.log('Conexión creada en http://localhost:3000');
});
