import Footer from "./partials/Footer";
import TopBar from "./partials/TopBar";
import error from "../assets/images/404.png"

const Error = () => {
    return (
        <div className="container-fluid">
            <div className="card text-center mb-4" >
                <div className="card-body d-flex align-items-center justify-content-center" Style={'height:70vh'}>
                    <div>
                        <img className="card-img rounded" Style={'max-width:200px;margin:auto'} src={error} />
                        <p>Error al traer los datos del Servidor</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
