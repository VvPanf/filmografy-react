package reactApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactApp.entity.Film;
import reactApp.service.FilmService;

import java.util.List;

@RestController
@RequestMapping("/films")
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {
    @Autowired
    private FilmService filmService;

    @GetMapping
    public ResponseEntity<List<Film>> getAll() {
        //filmService.add(new Film(null, "Test", 2020, "test", false));
        return new ResponseEntity<>(filmService.allFilms(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Film> getById(@PathVariable Long id) {
        return new ResponseEntity<>(filmService.getById(id), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Film> save(@RequestBody Film film) {
        return new ResponseEntity<>(filmService.save(film), HttpStatus.CREATED);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Film> update(@RequestBody Film film) {
        return new ResponseEntity<>(filmService.save(film), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(filmService.delete(id), HttpStatus.OK);
    }
}
