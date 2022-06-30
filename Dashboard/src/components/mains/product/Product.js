import { useEffect, useState } from 'react';
import ContentRowCards from '../../ContentRowCards';
import Footer from '../../partials/Footer';
import TopBar from '../../partials/TopBar';
import ItemContent from '../../ItemContent';
import { getAll } from '../../../services/getApi';
import { loading, error } from '../../../services/tools'

const Product = () => {
    const [products, setProducts] = useState();
    const [selectedOption, setSelectedOption] = useState(1);
    const [nameCategory, setNameCategory] = useState();
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState(1);
    const router = "products";

    useEffect(() => {
        getItemsxPagexSelected(selectedOption,pages);
    }, []);

    const getItemsxPagexSelected = ( selectedOption, page) => {
        setItems([]);
        getAll(`${router}?page=${page}&category=${selectedOption}`).then(data => {
            setProducts(data);
            setNameCategory(data.countByCategory?.find(item => item.id === selectedOption)?.title);
            setItems(data.products);
            setPages(data.pages);
        })
            .catch(err => setProducts(404));
    }

    const onValueChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedOption(value);
        getItemsxPagexSelected(value,1);
    }

    const sendOk = () => {
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
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">{`Productos de la categoría ${nameCategory}`}</h1>
                            <strong>{`Pagina ${pages?.current} de ${pages?.total}`} </strong>
                        </div>
                        <div className={items?.length > 0?"card-columns":'d-sm-flex align-items-center justify-content-center'} Style={'min-height: 400px !important;'}>
                            {items.length > 0 ? items.map((item, index) => <ItemContent {...item} key={index} router={router} />) : pages?.total==0?'No hay productos ':'Cargando...'}
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-arrow-left m-4" Style={pages?.previous ? 'color:#0dcaf0' : ''} onClick={pages?.previous ? () => getItemsxPagexSelected( selectedOption, pages.previous) : ''}></i>
                            <i class="fa-solid fa-arrow-right m-4" Style={pages?.next ? 'color:#0dcaf0' : ''} onClick={pages?.next ? () => getItemsxPagexSelected( selectedOption, pages.next) : ''}></i>
                        </div>

                    </div>
                    {/*<!--End Content Row Top-->*/}
                    <Footer />
                </div>
            </div>
        );
    }

    if (products === 404) {
        return error();
    } else if (products) {
        return sendOk();
    } else {
        return loading();
    }
    
}

export default Product;
