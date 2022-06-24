import { useEffect, useState, useRef } from 'react';
import Footer from '../partials/Footer';
import TopBar from '../partials/TopBar';
import ContentRowCards from '../ContentRowCards'


const Index = () => {
    const [element, setElement] = useState({});
    const [selectedOption, setSelectedOption] = useState(1);
    const [nameSelected, setNameSelected] = useState('');
    const [item, setItem] = useState({});
    const [route, setRoute] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(res => res.json())
            .then(data => {
                setElement(data);
                
            })
            .catch(err => console.log("Error: ", err))
    }, []);

    const onValueChange = (event) => {
        setSelectedOption(event.target.value);
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
                    <div className="card-body">
                        <div class="row g-0 px-2">
                            <div class="col-md-6" >
                                <ContentRowCards
                                    carts={element.countByCategory}
                                    selectedOption={selectedOption}
                                    onValueChange={onValueChange}
                                />
                            </div>
                            <div class="col-md-6 border rounded" >
                                <div class="card-body ">
                                    <div className='my-3'>
                                        <small><strong><del>${ }</del></strong></small>
                                        <h5 class="card-title text-success"><strong>${ }</strong></h5>
                                    </div>
                                    <div className='my-3'>
                                        <p><i class="fa-solid fa-truck text-success"></i> Envío: { }</p>
                                    </div>
                                    <div className='my-3'>
                                        <p> <i class="fa-solid fa-arrow-rotate-left text-success"></i> Devolucion: { }</p>
                                    </div>
                                    <div className='my-3'>
                                        <h4>Medios de pago:</h4>
                                    </div>
                                    <div className='my-3'>
                                        <h4>Categorías: </h4>
                                        <p></p>
                                    </div>
                                    <div className='my-3'>
                                        <h4>Garantía: </h4>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-3'>
                            <h4>Descripción: </h4>
                            <p class="card-text"></p>
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
