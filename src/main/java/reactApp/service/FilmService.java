package reactApp.service;

import reactApp.entity.Film;

import java.util.List;

public interface FilmService {
    List<Film> allFilms();
    Film save(Film film);
    String delete(Long id);
    Film getById(Long id);
}