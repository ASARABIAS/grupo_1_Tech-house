import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainDetailUser from './MainDetailUser';
import { getById } from '../../../services/getApi';
import Loading from '../../Loading';
import TopBar from '../../partials/TopBar';
import Footer from '../../partials/Footer';

const DetailUser = () => {

    const { id } = useParams();
    const [user, setUser] = useState();
    const router = 'users';

    useEffect(() => {
        getById(router, id).then(response => response.status===200? setUser(response.data): setUser(404))
            .catch(err => console.log("Error: ", err));

    }, []);

    if (user) {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    {/*<!-- Content Row Top -->*/}
                    <div className="container-fluid">
                        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Detalle de Usuario</h1>
                        </div>

                        <MainDetailUser
                            user={user}
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

export default DetailUser;
