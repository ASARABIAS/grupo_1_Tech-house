import React from 'react';
import { Link } from 'react-router-dom';


function Image(props) {
    return (
        <div className="card ">
            <div className="card-body">
                <h5 className="card-title  text-primary">{props.name}</h5>
                <img className="card-img-top" src={props.image} alt="Card image cap" />
                <p className="card-text">{props.specifications}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted"><Link to={`${props.router}/${props.id}`}>Leer mas..</Link></small>
            </div>
        </div>
    )
}



export default Image;