import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */


function ContentRowMovies(props){
    //console.log("ContentRowMovies props.carts: ", props.carts);
    return (
    
        <div className="row">
            
            {props.carts?.map( (movie, index) => {

                return <SmallCard {...movie} key={index} selectedOption={props.selectedOption} onValueChange={props.onValueChange} />
            
            })}

        </div>
    )
}

export default ContentRowMovies;