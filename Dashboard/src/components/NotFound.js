import React from 'react';
import notfound from '../assets/images/404.jpg';
import TopBar from './partials/TopBar'
import Footer from './partials/Footer'

function NotFound() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            {/*<!-- Main Content -->*/}
            <div id="content">
                <TopBar />
                {/*<!-- Content Row Top -->*/}
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="card text-center mb-4" >
                            <div className="card-body d-flex align-items-center justify-content-center" Style={'height:70vh'}>
                                <div>
                                    <img className="card-img rounded" Style={'max-width:450px;margin:auto'} src={notfound} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/*<!--End Content Row Top-->*/}
                <Footer />
            </div>
        </div>
    )
}


export default NotFound;