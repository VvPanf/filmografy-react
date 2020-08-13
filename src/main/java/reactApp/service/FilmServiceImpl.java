package reactApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactApp.entity.Film;
import reactApp.repo.FilmRepo;

import java.util.Optional;
import java.util.List;

@Service
public class FilmServiceImpl implements FilmService {
    @Autowired
    private FilmRepo filmRepo;

    @Override
    public List<Film> allFilms() {
        return filmRepo.findAll();
    }

    @Override
    public Film save(Film film) {
        return filmRepo.save(film);
    }

    @Override
    public String delete(Long id) {
        filmRepo.deleteById(id);
        return "success";
    }

    @Override
    public Film getById(Long id) {
        return filmRepo.findById(id).get();
    }
}
