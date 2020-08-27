package com.crud.rest;
import com.crud.dao.MovieRepository;
import com.crud.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "movies")
public class MovieRest {

    @Autowired
    private MovieRepository repository;

    @PostMapping(value = "/save")
    public void save(@RequestBody Movie movie){
        repository.save(movie);
    }

    @GetMapping(value = "/list")
    public Iterable<Movie> list(){
        return repository.findAll();
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable("id") Long id){
        repository.deleteById(id);
    }

    @PutMapping (value = "/update")
    public Movie update(@RequestBody Movie movie){
        if(movie.getId() != null){
            return repository.save(movie);
        }
        throw  new RuntimeException("El id no es valido");
    }
}
