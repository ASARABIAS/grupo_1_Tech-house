import React,{ useEffect} from 'react';
import image from '../../assets/images/logo-DH.png';
import { Link } from 'react-router-dom';
import { checkToken } from '../../services/tools'
import { verifyUser } from '../../services/getApi';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = checkToken();
        console.log();
        if (token.length>10) {
            verifyUser(token)
            .then((data) =>{
                if(data.status !== 200){
                    navigate('/users/login');
                }else{
                    sessionStorage.setItem('user', JSON.stringify(data.data));
                }
            });
        
        }else{
            navigate('/users/login');
        }
    }, []);
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House" />
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Tech-House</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/products">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Productos</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/users">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Usuarios</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item nav-link">
                    <Link className="nav-link" to="/categories">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Categorías</span></Link>
                </li>
                <li className="nav-item nav-link">
                    <Link className="nav-link" to="/searchMovies">
                        <i className="fas fa-fw fa-search"></i>
                        <span>Buscar</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </React.Fragment>
    )
}
export default SideBar;