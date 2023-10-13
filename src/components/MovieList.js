import React from "react";


const MovieList=(props)=>{

    const FavouriteComponent = props.favoutiteComponet

    return(
       
    <>
        {props.movies.map((movie,index)=> 
        <div key={movie.imbdID} className="movie_card">
            <img src={movie.Poster} alt={movie.Title}></img>
            <div onClick={()=>props.handlefavouritesClick(movie)} className="overlay">
                <FavouriteComponent />
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
            </div>
        </div>
        )}
    </>
    );
}
export default MovieList;