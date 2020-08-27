import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoviesService } from './service/MovieService';


export default class App extends Component{

   constructor(){
     super();
    this.state ={
         movies : []
    }
     this.movieService = new MoviesService();
   }

   componentDidMount(){
     this.movieService.getAll().then( data =>this.setState({movies: data}))
   }

   render(){
     return(
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
       {console.log(this.state.movies)}
        {this.state.movies.map((movie)=>{
          return(
            <tr key={movie.id}>
            <td>{movie.name}</td>
            <td>{movie.console}</td>
          </tr>
          )
        })}
      </tbody>
    </table>
     );
   }
}
