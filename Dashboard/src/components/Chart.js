import React from 'react';
import Image from './Image';


function Chart(props) {
    return (

        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">{props.title}</h5>
                </div>
                <div className="card-body">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <Image />
                            <Image />
                            <Image /> 
                            <Image />
                            <Image />

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Chart;