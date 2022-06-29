import Footer from "./partials/Footer";
import TopBar from "./partials/TopBar";

const Loading = () => {
    return (
        <div className="container-fluid">
        <div className="card text-center mb-4" >
            <div className="card-body d-flex align-items-center justify-content-center" Style={'height:70vh'}>
               {/*<img src={loading}  />*/} 
               <p>Cargando...</p>
            </div>
        </div>
    </div>
    );
}

export default Loading;
