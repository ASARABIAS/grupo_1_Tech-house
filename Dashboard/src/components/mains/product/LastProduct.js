
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const LastProduct = () => {
    const { id } = useParams();
const [product, setProduct] = useState({});

useEffect(() => {
    fetch(`http://localhost:3030/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.log("Error: ", err));
}, []);
  return (
    <div className="container-fluid mt-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto agregado: {product.name}</h5>
                </div>
                <div className="card-body">
                    <div class="row g-0 px-2">
                        <div class="col-md-6" >
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" Style={'max-width:350px;margin:auto' } src={product.imageUrl} alt=" " />
                        </div>
                        <div class="col-md-6 border rounded" >
                            <div class="card-body ">
                                <div className='my-3'>
                                    <small><strong><del>${product.price}</del></strong></small>
                                    <h5 class="card-title text-success"><strong>${product.price - (product.price * (product.discount / 100))}</strong></h5>
                                </div>
                                <div className='my-3'>
                                    <p><i class="fa-solid fa-truck text-success"></i> Envío: {product.shipping != 0 ? `$${product.shipping}` : 'Gratis'}</p>
                                </div>
                                <div className='my-3'>
                                    <p> <i class="fa-solid fa-arrow-rotate-left text-success"></i> Devolucion: {product.return_value != 0 ? `$${product.return_value}` : 'Gratis'}</p>
                                </div>
                                <div className='my-3'>
                                    <h4>Medios de pago:</h4>
                                    {product.payment_methods?.map((item, index) => <img key={index} src={`http://localhost:3030/images/methodLogos/${item.image}`} className="mx-1" Style="width: 80px; height:30px;" />)}
                                </div>
                                <div className='my-3'>
                                    <h4>Categorías: </h4>
                                    <p>{product.categories?.name}</p>
                                </div>
                                <div className='my-3'>
                                    <h4>Garantía: </h4>
                                    <p>{product.warranty_text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-3'>
                        <h4>Descripción: </h4>
                        <p class="card-text">{product.specifications}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LastProduct