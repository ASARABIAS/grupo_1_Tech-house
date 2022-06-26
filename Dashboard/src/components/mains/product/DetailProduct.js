import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainDetailProduct from './MainDetailProduct';
import { getById } from '../../../services/getApi';
import Loading from '../../Loading';
import TopBar from '../../partials/TopBar';
import Footer from '../../partials/Footer';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const router = 'products';

    useEffect(() => {
        getById(router, id).then(response => response.status===200? setProduct(response.data):setProduct(404))
            .catch(err => console.log("Error: ", err));
    }, []);

    if (product) {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    {/*<!-- Content Row Top -->*/}
                    <div className="container-fluid">
                        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Detalle de Producto</h1>
                        </div>

                        <MainDetailProduct
                            product={product}
                        />
                    </div>
                    {/*<!--End Content Row Top-->*/}
                    <Footer />
                </div>
            </div>

        );
    } else {
        return (
            <Loading />
        );
    }

}

export default DetailProduct;
