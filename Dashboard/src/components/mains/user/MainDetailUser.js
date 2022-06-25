
const MainDetailUser = ({user}) => {
    return (
        <div className="container-fluid mt-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">{user?.name}</h5>
                </div>
                <div className="card-body">
                    <div class="row g-0 px-2">
                        <div class="col-md-6 text-center" >
                            <img className="card-img rounded" Style={'max-width:350px;margin:auto'} src={user?.imageUrl} alt=" " />
                        </div>
                        <div class="col-md-6 border rounded" >
                            <div class="card-body">
                                <div className='my-3'>
                                    <h4>Correo: </h4>
                                    <p>{user?.email}</p>
                                </div>
                                <div className='my-3'>
                                    <h4>Pais: </h4>
                                    <p>{user?.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDetailUser;
