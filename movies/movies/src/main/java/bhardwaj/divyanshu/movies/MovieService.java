package bhardwaj.divyanshu.movies;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allmovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> SingleMovie(String imdbId) {

        return movieRepository.findMovieByImdbId(imdbId);
    }


}