import { useEffect, useState } from 'react'
import './App.css'
import validator from 'validator';

function App() {
  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [telefono, setTelefono] = useState('')
  const [inputEnabled, setInputEnabled] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Usuario': usuario,
        'Correo': correo,
        'Contrasena': contrasena,
        'Telefono': telefono
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  useEffect(() => {
    if (usuario != "" && correo != "" && contrasena != "" && telefono != 0) {
      if (validator.isEmail(correo) && validator.isStrongPassword(contrasena) && validator.isMobilePhone(telefono)) {
        setInputEnabled(true)
      }
    }
    if (validator.isEmail('fooar.com')) {
      console.log("is email")
    }
    
  }, [inputEnabled, usuario, correo, contrasena, telefono]);

  return (
    <section className='flex flex-col gap-4 p-4'>
      <h1>Creado por Mauricio Martínez Rodríguez</h1>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <label htmlFor="">Usuario</label>
          <input
            className='border rounded'
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="">Correo</label>
          <input
            className={`border rounded focus:outline ${validator.isEmail(correo) ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500' : 'border-red-500 focus:border-red-500 focus:outline-red-500'}`}
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="">Contraseña</label>
          <input
            className={`border rounded focus:outline ${validator.isStrongPassword(contrasena) ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500' : 'border-red-500 focus:border-red-500 focus:outline-red-500'}`}
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <div className='flex justify-between'>
          <label htmlFor="">Teléfono</label>
          <input
            className={`border rounded focus:outline ${validator.isMobilePhone(telefono) ? 'border-blue-500 focus:border-blue-500 focus:outline-blue-500' : 'border-red-500 focus:border-red-500 focus:outline-red-500'}`}
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <button className='w-full' type="submit" disabled={!inputEnabled}>Enviar</button>
      </form>
    </section>
  )
}

export default App
