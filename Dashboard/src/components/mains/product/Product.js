import { useEffect, useState } from 'react';
import ContentRowCards from '../../ContentRowCards';
import Footer from '../../partials/Footer';
import TopBar from '../../partials/TopBar';
import ItemContent from '../../ItemContent';
import { getAll } from '../../../services/getApi';
import Loading from '../../Loading';

const Product = () => {
    const [products, setProducts] = useState();
    const [selectedOption, setSelectedOption] = useState(1);
    const [nameCategory, setNameCategory] = useState();
    const [items, setItems] = useState([]);
    const router = "products";

    useEffect(() => {
        getAll(router).then(data => {
            setProducts(data);
            setNameCategory(data.countByCategory?.find(item => item.id === selectedOption)?.title);
            setItems(data.products?.filter(item => item.category === selectedOption));
        })
            .catch(err => console.log("Error: ", err))
    }, []);

    const onValueChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedOption(value);
        setNameCategory(products.countByCategory?.find(item => item.id === value)?.title);
        setItems(products.products?.filter(item => item.category === value));
    }

    if (products) {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    {/*<!-- Content Row Top -->*/}
                    <div className="container-fluid">
                        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Productos</h1>
                            <small>{`Total: ${products?.count}`}</small>
                        </div>

                        {/*<!-- Content Row Cards-->*/}

                        <ContentRowCards
                            carts={products?.countByCategory}
                            selectedOption={selectedOption}
                            onValueChange={onValueChange}
                        />
                        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">{`Productos de la categoría ${nameCategory}`}</h1>
                        </div>
                        <div className="card-columns">
                            {items.length > 0 ? items.map((item, index) => <ItemContent {...item} key={index} router={router} />) : `No hay productos de la categoría ${nameCategory}`}
                        </div>

                    </div>
                    {/*<!--End Content Row Top-->*/}
                    <Footer />
                </div>
            </div>
        );
    } else {
        return (
            <Loading/>
        );
    }
}

export default Product;
