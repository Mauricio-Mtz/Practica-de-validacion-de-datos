const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const port = 3000

let usuarios = [
  {
    usuario: 'McPeMauri',
    correo: 'mcpemauri@gmail.com',
    contrasena: '1224',
    cumpleanios: '24/09/2003',
    nombre: 'Mauricio Martínez',
  },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  const usuarioRecibido = req.headers.usuario
  const contrasenaRecibida = req.headers.contrasena

  const usuario = usuarios.find(
    (u) => u.usuario === usuarioRecibido && u.contrasena === contrasenaRecibida
  )
  if (usuario) {
    res.json({
      statusCode: 200,
      intMessage: 'Operation Successful',
      data: {
        usuario: usuario.usuario,
        correo: usuario.correo,
        cumpleanios: usuario.cumpleanios,
        nombre: usuario.nombre,
      },
    })
  } else {
    res.json({
      statusCode: 401,
      intMessage: 'Operation Failed',
      data: {},
    })
  }
})

app.post('/register', (req, res) => {
  const { usuario, correo, contrasena, cumpleanios, nombre } = req.body
  if (!usuario || !correo || !contrasena || !cumpleanios || !nombre) {
    res.json({
      statusCode: 400,
      intMessage: 'Missing fields'
    })
    return
  } else if (usuarios.find((u) => u.usuario === usuario || u.correo === correo)) {
    res.json({
      statusCode: 400,
      intMessage: 'Credentials already in use'
    })
    return
  } else {
    usuarios.push({ usuario, correo, contrasena, cumpleanios, nombre })
    res.json({
      statusCode: 200,
      intMessage: 'Operation Successful',
      data: {
        usuario,
        correo,
        cumpleanios,
        nombre,
      },
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
