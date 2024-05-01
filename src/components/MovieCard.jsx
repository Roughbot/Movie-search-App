const MovieCard = (data) => {
  const movieDetails = data.data;

  const genres = movieDetails.moviegenres;

  return (
    <>
      {movieDetails.moviemainphotos[0] && (
        <div className="relative">
          <div className="flex items-center justify-center">
            <img
              src={movieDetails.moviemainphotos[0]}
              alt={movieDetails.movietitle}
              className="object-cover w-full h-full rounded-lg shadow-lg transition-opacity opacity-100 hover:opacity-50"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300  bg-black bg-opacity-70">
            <p className="text-3xl font-bold text-white text-center">
              {movieDetails.movietitle}
            </p>
            {genres && (
              <div className="flex flex-wrap mt-2 space-y-2 items-center justify-center">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-2 mx-1 text-lg font-semibold text-white bg-green-700 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
