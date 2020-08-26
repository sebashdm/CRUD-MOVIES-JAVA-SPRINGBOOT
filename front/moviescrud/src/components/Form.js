import React, { useContext,useRef , useState} from 'react';


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

  export default Form;

  