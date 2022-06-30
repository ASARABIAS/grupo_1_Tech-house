import { useEffect, useState, useRef } from 'react';
import Footer from '../partials/Footer';
import TopBar from '../partials/TopBar';
import ContentRowCards from '../ContentRowCards'
import MainDetailProduct from './product/MainDetailProduct';
import MainDetailUser from './user/MainDetailUser';
import ItemContent from '../ItemContent';
import { getAll, getById } from '../../services/getApi';
import { loading, error } from '../../services/tools'


const Index = () => {
    const [element, setElement] = useState();
    const [selectedOption, setSelectedOption] = useState(0);
    const [nameSelected, setNameSelected] = useState('');
    const [endItem, setEndItem] = useState({});
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState();
    const [route, setRoute] = useState();

    useEffect(() => {
        getAll('index').then(response => {
            if (response.status === 200) {
                const data = response.data;
                setElement(data);
                setNameSelected(data[selectedOption].title);
                getItemSelected(data[selectedOption].route, data[selectedOption].endId, selectedOption);
            }
        }).catch((err) => setElement(404));
    }, []);

    const getItemSelected = (route, endId, selected) => {
        setRoute(route);

        getById(route, endId).then(response => setEndItem(response.data))
            .catch(err => setElement(404));

        getItemsxPagexSelected(route, selected, 1);
    }

    const getItemsxPagexSelected = (route, selected, page) => {
        setItems([]);
        getAll(`${route}?page=${page}`)
            .then(data => {
                setItems(selected === 0 ? data.products : data.users);
                setPages(data.pages);
            })
            .catch(err => setElement(404));
    }

    const onValueChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedOption(value);
        setNameSelected(element[value].title);
        getItemSelected(element[value].route, element[value].endId, value);
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
                            <h1 className="h3 mb-0 text-gray-800">Panel Principal</h1>
                        </div>

                        {/*<!-- Content Row Cards-->*/}

                        <ContentRowCards
                            carts={element}
                            selectedOption={selectedOption}
                            onValueChange={onValueChange}
                        />
                        <div className="d-sm-flex aligns-items-center justify-content-between">
                            <h1 className="h3 mb-0 text-gray-800">{`Ultimo ${nameSelected?.substring(0, nameSelected.length - 1)}`}</h1>
                        </div>
                        {selectedOption === 0 ? <MainDetailProduct product={endItem} /> : <MainDetailUser user={endItem} />}

                        <div className="d-sm-flex aligns-items-center justify-content-between mr-4">
                            <h1 className="h3 mb-0 text-gray-800">{`Listado de ${nameSelected}`}</h1>
                            <strong>{`Pagina ${pages?.current} de ${pages?.total}`} </strong>
                        </div>
                        <div className={items?.length > 0?"container-fluid mt-4":'d-sm-flex align-items-center justify-content-center'} Style={'min-height: 400px !important;'}>
                            <div className="card-columns">
                                {items?.length > 0 ? items.map((item, index) => <ItemContent {...item} key={index} router={route} />) : 'Cargando...'}
                            </div>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-arrow-left m-4" Style={pages?.previous ?'color:#0dcaf0':''} onClick={pages?.previous ?()=>getItemsxPagexSelected(route, selectedOption, pages.previous):''}></i>
                            <i class="fa-solid fa-arrow-right m-4" Style={pages?.next ?'color:#0dcaf0':''} onClick={pages?.next ?()=>getItemsxPagexSelected(route, selectedOption, pages.next):''}></i>
                        </div>

                    </div>
                    {/*<!--End Content Row Top-->*/}
                    <Footer />
                </div>
            </div>
        );
    }

    if (element === 404) {
        return error();
    } else if (element) {
        return sendOk();
    } else {
        return loading();
    }
}

export default Index;
