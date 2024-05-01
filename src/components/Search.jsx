import { useState } from "react";
import movies from "../../public/movies-filter-react";
import MovieCard from "./MovieCard";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(""); // State for selected language filter
  const [selectedGenre, setSelectedGenre] = useState(""); // State for selected genre filter
  const [moviesList, setMoviesList] = useState(movies);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchData(searchValue);

    // Filter movies based on search query, selected language, and genre
    const filteredMovies = movies.filter((movie) => {
      const matchTitle = movie.movietitle
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchLanguage = selectedLanguage
        ? movie.movielanguages.includes(selectedLanguage)
        : true;
      const matchGenre = selectedGenre
        ? movie.moviegenres.includes(selectedGenre)
        : true;
      return matchTitle && matchLanguage && matchGenre;
    });

    setMoviesList(filteredMovies);
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setSelectedLanguage(selectedLang);

    if (selectedLang === "All Languages") {
      return setMoviesList(movies);
    } else {
      const selectedLanguageMovie = movies.filter((movie) => {
        return movie.movielanguages.includes(selectedLang);
      });
      setMoviesList(selectedLanguageMovie);
    }
  };

  const handleGenreChange = (e) => {
    const selectedGen = e.target.value;
    setSelectedGenre(selectedGen);

    if (selectedGen === "All Genres") {
      return setMoviesList(movies);
    } else {
      const selectedGenreMovie = movies.filter((movie) => {
        return movie.moviegenres.includes(selectedGen);
      });
      setMoviesList(selectedGenreMovie);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row px-10 md:px-40 gap-6 items-center">
        <input
          className="w-full bg-gray-800 rounded-md p-4 text-white"
          type="text"
          placeholder="Search Movies..."
          value={searchData}
          onChange={handleSearchChange}
        />
        {/* Language filter */}
        <select
          className="bg-gray-800 rounded-md p-2 text-white"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">All Languages</option>
          {/* Assuming each movie may have multiple languages */}
          {[...new Set(movies.flatMap((movie) => movie.movielanguages))].map(
            (lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            )
          )}
        </select>
        {/* Genre filter */}
        <select
          className="bg-gray-800 rounded-md p-2 text-white"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {[...new Set(movies.flatMap((movie) => movie.moviegenres))].map(
            (genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            )
          )}
        </select>
      </div>
      <div className="p-20 space-x-10 space-y-10 grid md:grid-cols-3 lg:grid-cols-4 items-center justify-center">
        {moviesList.map((movie, index) => (
          <MovieCard key={index} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
