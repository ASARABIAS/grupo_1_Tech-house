import { useEffect, useState, useRef } from 'react';
import Footer from '../partials/Footer';
import TopBar from '../partials/TopBar';
import ContentRowCards from '../ContentRowCards'
import MainDetailProduct from './product/MainDetailProduct';
import MainDetailUser from './user/MainDetailUser';
import ItemContent from '../ItemContent';


const Index = () => {
    const [element, setElement] = useState({});
    const [selectedOption, setSelectedOption] = useState(0);
    const [nameSelected, setNameSelected] = useState('');
    const [item, setItem] = useState({});
    const [items, setItems] = useState([]);
    const [route, setRoute] = useState();

    useEffect(() => {
        fetch('http://localhost:3030/api/index')
            .then(res => res.json())
            .then(data => {
                setElement(data);
                setNameSelected(data.countByElement[selectedOption].title);
                getItemSelected(data.countByElement[selectedOption].route, data.endElementsById[selectedOption],selectedOption)
            })
            .catch(err => console.log("Error: ", err))
    }, []);

    const getItemSelected = (route, index,selected) => {
        setRoute(`/${route}`);
        fetch(`http://localhost:3030/api/${route}/${index}`)
            .then(res => res.json())
            .then(data => {
                setItem(data);
            })
            .catch(err => console.log("Error: ", err));

        fetch(`http://localhost:3030/api/${route}`)
            .then(res => res.json())
            .then(data => {
                setItems(selected == 0 ? data.products : data.users);
            })
            .catch(err => console.log("Error: ", err));

    }

    const onValueChange = (event) => {
        setSelectedOption(event.target.value);
        setNameSelected(element.countByElement[event.target.value].title);
        getItemSelected(element.countByElement[event.target.value].route, element.endElementsById[event.target.value],event.target.value);
    }

    return (
        <div id="content-wrapper" className="d-flex flex-column">
            {/*<!-- Main Content -->*/}
            <div id="content">
                <TopBar />
                {/*<!-- Content Row Top -->*/}
                <div className="container-fluid">
                    <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Tech-House</h1>
                    </div>

                    {/*<!-- Content Row Cards-->*/}

                    <ContentRowCards
                        carts={element.countByElement}
                        selectedOption={selectedOption}
                        onValueChange={onValueChange}
                    />
                    <div className="d-sm-flex aligns-items-center justify-content-between">
                        <h1 className="h3 mb-0 text-gray-800">{`Ultimo ${nameSelected?.substring(0, nameSelected.length - 1)}`}</h1>
                    </div>
                    {selectedOption == 0 ? <MainDetailProduct product={item} /> : <MainDetailUser user={item} />}

                    <div className="d-sm-flex aligns-items-center justify-content-between">
                        <h1 className="h3 mb-0 text-gray-800">{`Listado de ${nameSelected?.substring(0, nameSelected.length - 1)}`}</h1>
                    </div>
                    <div className="container-fluid mt-4">
                        <div className="card-columns">
                            {items?.length > 0 ? items.map((item, index) => <ItemContent {...item} key={index} router={route} />) : `No hay ${nameSelected?.substring(0, nameSelected.length - 1)}`}
                        </div>
                    </div>


                </div>
                {/*<!--End Content Row Top-->*/}
                <Footer />
            </div>
        </div>
    );
}

export default Index;
