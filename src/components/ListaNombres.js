import React, {useState} from 'react';

import uniqid from 'uniqid';

const ListaNombres = () => {
    
    const [nombre, setNombre] = useState('');
    const [listaNombre, setlistaNombre] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    
    // agregar nombre a la lista de nombres
    const addNombre = (e)=> {
        e.preventDefault()
        if(!nombre.trim()){
            setError('El campo nombre esta vacio');
            return;
        }
        const nuevoNombre = {
         id:uniqid(),
         tituloNombre:nombre   
        }
        setlistaNombre([...listaNombre, nuevoNombre]);
        setNombre('')
        setError(null)
        
    }

    const deleteNombre = (id) => {
        const nuevoarray = listaNombre.filter(item => item.id !== id);
        setlistaNombre(nuevoarray);
    }

    const editar = (item) => {
        setModoEdicion(true);
        setNombre(item.tituloNombre);      
        setId(item.id);  
    }

    const editarNombre = (e) =>{
        e.preventDefault()
        const NuevoArray = listaNombre
        .map(item => item.id === id ? {id:id, tituloNombre:nombre} : item)
        setlistaNombre(NuevoArray);
        setModoEdicion(false);
        setNombre('');
    }
    
    // setea el estado del nombre
    const handleChange = (e) => {
        setNombre(e.target.value);
    }
    return (
        <div>     
            <h2>Aplicacion CRUD BASICO</h2>
            <div className='row'>
                <div className='col'>   
                <h2>Listado de Nombres</h2>
                <ul className='list-group' >
                    {
                        listaNombre.map(item =>
                            <li key={item.id} className='list-group-item'>
                                {item.tituloNombre}
                                <button
                                className='btn btn-danger float-right'
                                onClick={() => {deleteNombre(item.id) }}
                                >
                                BORRAR
                                
                                </button>
                                <button
                                className='btn btn-info float-right'
                                onClick={() => {editar(item) }} 
                                >
                                EDITAR
                                
                                </button>
                            </li>   
                        )
                        }
                </ul>
                </div>
                <div className='col' >
                    <h2>Formulario para añadir nombre</h2>
                    <form onSubmit={modoEdicion ? editarNombre : addNombre  }    className='form-group' >
                        <input onChange={handleChange}  className='form-control mb-3' type='text' placeholder='Introduce el nombre' value={nombre} />
                        <input className='btn btn-info btn-block' type='submit' value={modoEdicion  ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE'   }/>
                    </form>
                    {
                        error != null ? (
                            <div className='alert alert-danger'  >
                                {error}
                            </div>
                        ):  
                        (
                            <div></div>
                        )

                    }
                </div>
            </div>
        </div>
    )
}
export default ListaNombres;