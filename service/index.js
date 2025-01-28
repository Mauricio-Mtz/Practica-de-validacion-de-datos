const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/usuarios', (req, res) => {
  const usuarioOriginal = 'Mauricio'
  const correoOriginal = 'mauri@gmail.com'
  const contrasenaOriginal = 'Mau1224!"'
  const telefonoOriginal = '4411108592'

  const usuario = req.headers.usuario
  const contrasena = req.headers.contrasena

  if (usuario === usuarioOriginal && contrasena === contrasenaOriginal) {
    res.json({
      statusCode: 200,
      intMessage: 'Operation Successfull',
      data: {
        usuario: usuarioOriginal,
        correo: correoOriginal,
        contrasena: telefonoOriginal,
        telefono: telefonoOriginal,
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
