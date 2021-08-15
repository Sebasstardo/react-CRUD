
import React, {Fragment, useState} from 'react' 
import {nanoid} from 'nanoid'

function App() {

  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = e =>{
    //evita que se presece el formulario con el evento GET
    e.preventDefault()
    // console.log('tare')
    if(!tarea.trim()){
      console.log('elemento vacio')
      setError('Escriba algo por favor')
      return
    }
    // console.log('tarea')
    setTareas([

      ...tareas,
      { id:nanoid(),
      NombreTarea:tarea }

    ])
    setTarea('')
    setError('')
  }

  const eliminarTarea = id =>{

    // console.log(id)
    // Si el id es distinto lo va a guardar dentro del array y si es igual al id lo va a expulsar
    const arrayFiltrado = tareas.filter(item =>item.id !== id )

    setTareas(arrayFiltrado)
  }

  const editarTarea = (item)=> {
    // console.log(item)
    setModoEdicion(true)

    setTarea(item.NombreTarea)
    setId(item.id)


  }
  const editar = (e)=>{

    e.preventDefault()
    // console.log('tare')
    if(!tarea.trim()){
      setError('Escriba algo por favor')

      console.log('elemento vacio')
      return
    }

    const arrayEditado = tareas.filter(item => item.id === id)[0].NombreTarea = tarea

    setTarea(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError('')
  }

  return (
    
    <div className="App mt-5 container">
      <h1 className="text-center ">CRUD Simple</h1>
      <hr></hr>

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {/* Litar las tareas */}
            {

              tareas.length === 0 ? (
                <li className="list-group-item">No Hay tareas</li>
              ) :(
                tareas.map(item =>(

                  <li key="{item.id}" className="list-group-item">
                    <span className="lead">{item.NombreTarea}</span>
      
                    <button 
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={()=> eliminarTarea(item.id)}
                    >Eliminar
                    </button>
      
                    <button 
                    className="btn btn-warning btn-sm float-end"
                    onClick={()=> editarTarea(item)}
                    >Editar
                    </button>
                  </li>
      
                    ))
              )
     
            }


          </ul>
        </div>

        <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion ? 'Editar Tarea': 'Agregar Tarea'
          }
        </h4>
        {/* el agregar tarea viene por defecto */}
        <form onSubmit={ modoEdicion ? editar : agregarTarea} className="pe-5">

          {
            error ? <span className="text-danger">{error}</span> : null
          }

          <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese Tarea"
          onChange={e => setTarea(e.target.value)}
          value = {tarea} />
          {
            modoEdicion ? (

              <button  className="btn btn-warning  w-100" type="submit">Editar</button>

              ) : (

              <button  className="btn btn-dark  w-100" type="submit">Agregar</button>
              )
          }
        </form>

        </div>
      </div>

    </div>
  );
}

export default App;
