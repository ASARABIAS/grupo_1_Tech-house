import { useEffect, useState, useRef } from 'react';
import ContentRowCards from '../../ContentRowCards';
import Footer from '../../partials/Footer';
import TopBar from '../../partials/TopBar';
import ItemContent from '../../ItemContent';
import { getAll } from '../../../services/getApi';
import { loading, error } from '../../../services/tools'

const User = () => {

    const [users, setUsers] = useState();
    const [selectedOption, setSelectedOption] = useState(1);
    const [nameRol, setNameRol] = useState();
    const [items, setItems] = useState([]);
    const router = "users";

    useEffect(() => {
        getAll(router).then(data => {
            setUsers(data);
            setNameRol(data.countByRol?.find(item => item.id == selectedOption)?.title);
            setItems(data.users?.filter(item => item.id_role == selectedOption));
        })
            .catch(err =>setUsers(404))

    }, []);

    const onValueChange = (event) => {
        setSelectedOption(event.target.value);
        setNameRol(users.countByRol?.find(item => item.id == event.target.value)?.title);
        setItems(users.users?.filter(item => item.id_role == event.target.value));
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
                            <h1 className="h3 mb-0 text-gray-800">Usuarios</h1>
                            <small>{`Total: ${users.count}`}</small>
                        </div>

                        {/*<!-- Content Row Cards-->*/}

                        <ContentRowCards
                            carts={users.countByRol}
                            selectedOption={selectedOption}
                            onValueChange={onValueChange}
                        />
                        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">{`Productos de la categoría ${nameRol}`}</h1>
                        </div>
                        <div className="card-columns">
                            {items.length > 0 ? items.map((item, index) => <ItemContent {...item} key={index} router={router} />) : `No hay productos de la categoría ${nameRol}`}
                        </div>

                    </div>
                    {/*<!--End Content Row Top-->*/}
                    <Footer />
                </div>
            </div>
        );
    }

    if (users === 404) {
        return error();
    } else if (users) {
        return sendOk();
    } else {
        return loading();
    }


}

export default User;
