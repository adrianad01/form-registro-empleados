// Creación de las variables asignadas a la funcion requieres para que mande llamar a los módulos importados
const express = require("express");

//Creacíon de la constante app llamando al método express() anteriormente creado;
const app = express();

//Base de datos mysql
const mysql = require("mysql");

//Middleware de Express
const cors = require("cors");

// Esta línea utiliza el middleware 'cors' para permitir solicitudes de recursos desde un origen diferente al del servidor.
app.use(cors());

// Esta línea indica a la aplicación que debe analizar las solicitudes entrantes con el tipo de contenido 'application/json' y convertirlas en objetos JavaScript accesibles mediante 'req.body'.
app.use(express.json());


// Creación de la variable db ejecuta una función con los valores de la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YTsFDJaMfO0zJakbd9PJx0UEfBfotoU3neTCwpuWuZeCvWChwWKbU6yK65zRaVCw",
  database: "empleados_crud",
});

// Definición de una ruta POST en la aplicación Express.
app.post("/create", (req, res) => {
  // Extracción de datos del cuerpo de la solicitud HTTP utilizando req.body.
  const nombre = req.body.nombre; // Extrae el valor del campo "nombre" del cuerpo de la solicitud.
  const apellidoPaterno = req.body.apellidoPaterno; // Extrae el valor del campo "apellidoPaterno" del cuerpo de la solicitud.
  const apellidoMaterno = req.body.apellidoMaterno; // Extrae el valor del campo "apellidoMaterno" del cuerpo de la solicitud.
  const edad = req.body.edad; // Extrae el valor del campo "edad" del cuerpo de la solicitud.
  const lugarNacimiento = req.body.lugarNacimiento; // Extrae el valor del campo "lugarNacimiento" del cuerpo de la solicitud.
  const calle = req.body.calle; // Extrae el valor del campo "calle" del cuerpo de la solicitud.
  const colonia = req.body.colonia; // Extrae el valor del campo "colonia" del cuerpo de la solicitud.
  const codigoPostal = req.body.codigoPostal; // Extrae el valor del campo "codigoPostal" del cuerpo de la solicitud.
  const municipio = req.body.municipio; // Extrae el valor del campo "municipio" del cuerpo de la solicitud.
  const estado = req.body.estado; // Extrae el valor del campo "estado" del cuerpo de la solicitud.
  const numeroExterior = req.body.numeroExterior; // Extrae el valor del campo "numeroExterior" del cuerpo de la solicitud.
  const pais = req.body.pais; // Extrae el valor del campo "pais" del cuerpo de la solicitud.

  // Consulta de la BD
  db.query(
    "INSERT INTO empleados(nombre,apellidoPaterno,apellidoMaterno,edad,lugarNacimiento,calle,colonia,codigoPostal,municipio,estado,numeroExterior,pais) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      lugarNacimiento,
      calle,
      colonia,
      codigoPostal,
      municipio,
      estado,
      numeroExterior,
      pais,
    ],
    // Callback para manejar la respuesta de la consulta a la base de datos.
    (err, result) => {
      if (err) {
        // Si hay un error, se imprime en la consola.
        console.log(err);
      } else {
        // Si no hay error, se envía la respuesta al cliente.
        res.send(result);
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellidoPaterno = req.body.apellidoPaterno;
  const apellidoMaterno = req.body.apellidoMaterno;
  const edad = req.body.edad;
  const lugarNacimiento = req.body.lugarNacimiento;
  const calle = req.body.calle;
  const colonia = req.body.colonia;
  const codigoPostal = req.body.codigoPostal;
  const municipio = req.body.municipio;
  const estado = req.body.estado;
  const numeroExterior = req.body.numeroExterior;
  const pais = req.body.pais;

  db.query(
    "UPDATE empleados SET nombre =?,apellidoPaterno=?,apellidoMaterno=?,edad=?,lugarNacimiento=?,calle=?,colonia=?,codigoPostal=?,municipio=?,estado=?,numeroExterior=?,pais=? WHERE id=?",
    [
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      edad,
      lugarNacimiento,
      calle,
      colonia,
      codigoPostal,
      municipio,
      estado,
      numeroExterior,
      pais,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Configurando el método delete con el query correcto, se eliminarán los campos por ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Se configura el puerto 3300, en ese se ejecutará el servidor
app.listen(3300, () => {
  console.log("Corriendo en el puerto 3300");
});
