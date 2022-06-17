import React from 'react';


function Image(props) {
    return (
        <div className="card ">
            <img className="card-img-top" src={props.image} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.specifications}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    )
}



export default Image;