import React from "react";


const SearchBox=(props)=>{
    return(
        <div className="SearchInput">
            <input id="inputValue" placeholder="Enter Movie Here" value={props.value} onChange={(event)=>props.setSearchItem(event.target.value)}  />
        </div>
    );
}

export default SearchBox