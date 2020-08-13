package reactApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reactApp.entity.Film;

@Repository
public interface FilmRepo extends JpaRepository<Film, Long> {
}
