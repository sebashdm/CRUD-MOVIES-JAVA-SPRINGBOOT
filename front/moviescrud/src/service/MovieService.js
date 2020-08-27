import axios from 'axios';

export class MoviesService{
  
    url = "http://localhost:8080/movies";
    getAll(){
        return axios.get(this.url + "/list").then(res =>res.data);
    }
}
