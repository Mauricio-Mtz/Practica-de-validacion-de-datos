import { useEffect, useState } from 'react'
import validator from 'validator'

function Register() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [correo, setCorreo] = useState('')
  const [cumpleanios, setCumpleanios] = useState('')
  const [nombre, setNombre] = useState('')
  const [inputEnabled, setInputEnabled] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuario,
        contrasena,
        correo,
        cumpleanios,
        nombre,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.statusCode === 200) {
          alert(data.intMessage)
        } else {
          alert(data.intMessage)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    //Validaciones de la existencia de contenido en los campos
    if (
      usuario != '' &&
      correo != '' &&
      contrasena != '' &&
      cumpleanios != '' &&
      nombre != ''
    ) {
      if (validator.isEmail(correo) && validator.isStrongPassword(contrasena)) {
        setInputEnabled(true)
      }
    }

    //Validaciones especificas para el usuario
    if (usuario !== usuario.toLowerCase()) {
      setUsuario(usuario.toLowerCase())
    }
    if (usuario.includes(' ')) {
      setUsuario(usuario.replace(/\s/g, ''))
    }
    
    //Validaciones especificas para la contraseña
    if (contrasena.includes(' ')) {
      setContrasena(contrasena.replace(/\s/g, ''))
    }

    //Validaciones especificas para la correo
    if (correo.includes(' ')) {
      setCorreo(correo.replace(/\s/g, ''))
    }

    //Validaciones especificas para la fehca de nacimiento
    const fechaActual = new Date();
    const fechaCumpleanios = new Date(cumpleanios);
    let edad = fechaActual.getFullYear() - fechaCumpleanios.getFullYear();
    const mes = fechaActual.getMonth() - fechaCumpleanios.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaCumpleanios.getDate())) {
      edad--;
    }
    if (edad < 13) {
      alert('Debes tener al menos 13 años para registrarte');
      setCumpleanios('');
    }
  }, [inputEnabled, usuario, correo, contrasena, cumpleanios, nombre])

  return (
    <section className="flex flex-col gap-4 p-4 text-center">
      <h1 className="font-extralight">
        Creado por Mauricio Martínez Rodríguez
      </h1>
      <h1 className="font-bold">REGISTRO</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <label htmlFor="">Usuario</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              usuario.length <= 10 && usuario.length > 0
                ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
                : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="text"
            placeholder='Máximo 10 caracteres'
            value={usuario}
            onChange={(e) => {
              if (e.target.value.length <= 10) {
                setUsuario(e.target.value)
              } else {
                alert('El máximo de caracteres permitidos es 10')
              }
            }}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="">Correo</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              validator.isEmail(correo)
              ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
              : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="email"
            placeholder='nombre@correo.com'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="">Contraseña</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              validator.isStrongPassword(contrasena)
                ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
                : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="password"
            placeholder='Mínimo 8 caracteres, 1 mayúscula, 1 número y 1 caracter especial'
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="">Cumpleaños</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              validator.isDate(cumpleanios)
                ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
                : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="date"
            value={cumpleanios}
            onChange={(e) => {
              setCumpleanios(e.target.value)
            }}
          />
        </div>

        <div className="flex justify-between">
          <label htmlFor="">Nombre completo</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              nombre.length > 0
                ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
                : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="text"
            value={nombre}
            placeholder='Nombre(s) Apellido(s)'
            onChange={(e) => {
              setNombre(e.target.value)
            }}
          />
        </div>

        <button
          className={`w-full ${!inputEnabled ? 'pointer-events-none' : ''}`}
          type="submit"
          disabled={!inputEnabled}
        >
          Enviar
        </button>
        <a href="/">Inicia sesión</a>
      </form>
    </section>
  )
}

export default Register
