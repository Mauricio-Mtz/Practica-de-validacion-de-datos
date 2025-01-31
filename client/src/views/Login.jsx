import { useEffect, useState } from 'react'
import validator from 'validator'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [inputEnabled, setInputEnabled] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'GET',
      headers: {
        'usuario': usuario,
        'contrasena': contrasena,
      }
    })
      .then((res) => res.json())
      .then((data) => {
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
    if (usuario != '' && contrasena != '') {
      if (validator.isStrongPassword(contrasena)) {
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
  }, [usuario, contrasena, inputEnabled])

  return (
    <section className='flex flex-col gap-4 p-4 text-center'>
      <h1 className='font-extralight'>Creado por Mauricio Martínez Rodríguez</h1>
      <h1 className='font-bold'>INICIO DE SESIÓN</h1>
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
          <label htmlFor="">Contraseña</label>
          <input
            className={`border rounded focus:outline w-lg px-2 ${
              validator.isStrongPassword(contrasena)
                ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500'
                : 'border-red-500 focus:border-red-500 focus:outline-red-500'
            }`}
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button
          className={`w-full ${!inputEnabled ? 'pointer-events-none' : ''}`}
          type="submit"
          disabled={!inputEnabled}
        >
          Iniciar sesión
        </button>
        <a href="/register">Crea una cuenta</a>
      </form>
    </section>
  )
}

export default Login
