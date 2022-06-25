
const MainDetailProduct = ({product}) => {
    return (
        <div className="container-fluid mt-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">{product?.name}</h5>
                </div>
                <div className="card-body">
                    <div class="row g-0 px-2">
                        <div class="col-md-6 text-center" >
                            <img className="card-img rounded" Style={'max-width:350px;margin:auto'} src={product?.imageUrl} alt=" " />
                        </div>
                        <div class="col-md-6 border rounded" >
                            <div class="card-body ">
                                <div className='my-3'>
                                    <small><strong><del>${product?.price}</del></strong></small>
                                    <h5 class="card-title text-success"><strong>${product?.price - (product?.price * (product?.discount / 100))}</strong></h5>
                                </div>
                                <div className='my-3'>
                                    <p><i class="fa-solid fa-truck text-success"></i> Envío: {product?.shipping != 0 ? `$${product?.shipping}` : 'Gratis'}</p>
                                </div>
                                <div className='my-3'>
                                    <p> <i class="fa-solid fa-arrow-rotate-left text-success"></i> Devolucion: {product?.return_value != 0 ? `$${product?.return_value}` : 'Gratis'}</p>
                                </div>
                                <div className='my-3'>
                                    <h4>Medios de pago:</h4>
                                    {product?.payment_methods?.map((item, index) => <img key={index} src={`http://localhost:3030/images/methodLogos/${item.image}`} className="mx-1" Style="width: 80px; height:30px;" />)}
                                </div>
                                <div className='my-3'>
                                    <h4>Categorías: </h4>
                                    <p>{product?.categories?.name}</p>
                                </div>
                                <div className='my-3'>
                                    <h4>Garantía: </h4>
                                    <p>{product?.warranty_text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-3'>
                        <h4>Descripción: </h4>
                        <p class="card-text">{product?.specifications}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDetailProduct;
