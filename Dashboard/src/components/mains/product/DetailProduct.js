import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainDetailProduct from './MainDetailProduct';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3030/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log("Error: ", err));
    }, []);
    return (
        <MainDetailProduct
            product={product}
        />
    );
}

export default DetailProduct;
