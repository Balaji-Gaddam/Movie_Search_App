import React from "react";
import "../Main/Main.css";
import { useState,useEffect } from "react";
import MovieList from "../components/MovieList";
import SearchBox from "../components/searchBox";
import MovieListHeading from "../components/movieListHeading";
import AddtoFavourites from "../components/AddtoFav";
import RemoveFavourites from "../components/RemoveFavourites";
import HomeImage from "../images/12713.jpg"



const Movie=()=>{
    // const DeleteID=document.getElementById("")
    const[movies,setMovies]=useState([]);
    const[favourites, setFavourites]=useState([])
    const[searchItem,setSearchItem]=useState(false) 
    const [loading,setLoading]=useState(false)
    const[IsError,setError]=useState({status:false,msg:""})

    const fetchingData= async (searchItem)=>{
            setLoading(true)
            setError({status:false,msg:''})
            try {
            const URL =`https://omdbapi.com/?s=${searchItem}&apikey=32971a3`;
            const responce= await fetch(URL);
            const responceJson = await responce.json();
            if(responceJson.Search){
                setMovies(responceJson.Search)
            } 
            setLoading(false)
            setError({status:false,msg:''})
            if(!responceJson.Search && searchItem !=0 ){
                throw new Error ("MOVIE NOT FOUND")
            }
            
            } catch (error) {
                setLoading(false)
                setError({status:true,msg:error.message|| "something went Wrong"})
                
            }
    };

    useEffect(()=>{
        fetchingData(searchItem)
    },[searchItem]);


   useEffect(()=>{
    const movieFavourites= JSON.parse(
        localStorage.getItem("favourites_of_react_app")
    );
    setFavourites(movieFavourites)
   },[])



    const saveToLocalStorage =(items)=>{
        localStorage.setItem("favourites_of_react_app", JSON.stringify(items))
    }





    const AddFavouriteMovie=(movie)=>{
        
        const newFavouriteList=[...favourites,movie]
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList) 
        
    }
       

    const RemoveFavouriteMovie=(movie)=>{
        const newFavouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID )
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }


    return(
       
        <div className="movie_section">
            <div className="nav_div">
                < MovieListHeading heading="Oho"/>
                <SearchBox searchItem={searchItem} setSearchItem={setSearchItem}/>
            </div>
           
            <hr/>
            {!loading && !IsError?.status && searchItem ==0 && <div className="Homepage"><img src={HomeImage} alt="movie" className="HomeImage"></img><h2>Search Movies</h2></div>}
        
            {loading && !IsError?.status&&<center><h1 style={{color:"chocolate"}}>Loading....</h1></center>}
            {IsError?.status&&<center><h1  style={{color:"red"}}>{IsError.msg}</h1></center>}
            {
                !loading && !IsError?.status&& searchItem &&<div className="movie_cards">
                <MovieList movies={movies} handlefavouritesClick={AddFavouriteMovie} favoutiteComponet={AddtoFavourites}/>
            </div>
            }
            <div className="nav_div" >
                < MovieListHeading heading="Favourites"/>
            </div>
            <hr/>
            <div className="movie_cards">
                <MovieList movies={favourites} handlefavouritesClick={RemoveFavouriteMovie} favoutiteComponet={RemoveFavourites}/>
            </div>
            
        </div>
        
       
    );
}
export default Movie;