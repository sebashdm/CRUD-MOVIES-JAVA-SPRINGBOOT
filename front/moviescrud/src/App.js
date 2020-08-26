import React, { useContext, createContext, useReducer, useEffect, useRef , useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const URL_API = "http://localhost:8080/movies"

const initialState = {
  list: []
}
const Store = createContext(initialState);

const Form = () =>{
  const formRef = useRef(null);
  const {dispatch} = useContext(Store);
  const [state, setState] = useState({});
  
   const onAdd = (event) =>{
    event.preventDefault();
    
    const request ={
  
      name: state.name,
    };
     
    console.log(request);
    fetch(URL_API+"/save",{
      method:"POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then((movie)=>{
      dispatch({type: "add-item" , item: movie});
      setState({name: ""});
      formRef.current.reset();
    });
  }
  

  return(
  <div>
  <h1>Add a new movie!</h1>

  <form ref ={formRef}>
      <div className="form-group">
         <label>Movie name</label>
         <input 
                className="form-control" 
                type="text"
                name="name" 
                onChange={(event) =>{
                  setState({...state, name: event.target.value})
                }}/>
         </div>
      <button 
              onClick={onAdd}
              className="btn btn-primary">send
      </button>
  </form>
</div>
  )
}



const VideoGameList = () =>{

  const {dispatch, state } = useContext(Store);

  useEffect(() => {
    fetch(URL_API+"/list")
    .then(response => response.json())
    .then((list) =>{
     dispatch({type: "update-list"}, list)
   })
  }, [state.list.length,dispatch]);
   
   return <div>
      <table className="table table-dark">
        <thead>
          <tr>
            <td>Id</td>
            <td>Nombre Juego</td>
            <td>Consola</td>
            <td>Valor</td>
            <td>¿Disponible?</td>
          </tr>
        </thead>
        <tbody>
         {console.log(state.list)}
          {state.list.map((movie)=>{
            return(
              <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.console}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
   </div>
}


const StoreProvider = ({ children }) =>{

  function reducer(state, action){
    switch(action.type){
      case 'Actualizar Catalogo' :
        return {...state, catalogue: action.catalogue }
      case 'Agregar-videojuego'  :
          const newCatalogue = state.catalogue;
          newCatalogue.push(action.item);
        return {...state, catalogue: newCatalogue }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch}}>
               {children}
         </Store.Provider>
}

function App() {
  return <StoreProvider>
            <Form />
            <VideoGameList />
         </StoreProvider>
}

export default App;
