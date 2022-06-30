import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser, getAll } from '../../services/getApi';
import { checkToken } from '../../services/tools';
import logo from '../../assets/images/tech-house.png'

function TopBar() {
	const [user, setUSer] = useState();
	const navigate = useNavigate()
	useEffect(() => {
		if (sessionStorage.getItem('user') != null) {
			setUSer(JSON.parse((sessionStorage.getItem('user'))));
		} else {
			const token = checkToken();
			if (token.length > 10) {
				verifyUser(token)
					.then((data) => {
						if (data.status !== 200) {
							navigate('/users/login');
						} else {
							sessionStorage.setItem('user', JSON.stringify(data.data));
							setUSer(data.data);
						}
					})
					.catch(() => navigate('/users/login'));

			} else {
				navigate('/users/login');
			}
		}

	}, []);

	const closeSession = () => {
		sessionStorage.removeItem('user');
		document.cookie=`token=' '`;
		getAll('logout')
			.then(data => navigate('/users/login'))
			.catch(err => navigate('/users/login'));
	}

	return (
		<React.Fragment>
			{/*<!-- Topbar -->*/}
			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

				{/*<!-- Sidebar Toggle (Topbar) -->*/}
				<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
					<i className="fa fa-bars"></i>
				</button>

				{/*<!-- Topbar Navbar -->*/}
				<ul className="navbar-nav w-100">


					<li className="nav-item abs-center d-flex align-items-center justify-content-center w-100">
						<img Style={'width:200px'} src={logo} />
					</li>

					{/*
					

					<li className="nav-item dropdown no-arrow mx-1">
						<a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
							<i className="fas fa-envelope fa-fw"></i>
							<span className="badge badge-danger badge-counter">7</span>
						</a>
					</li>
 */}
					{/*<!-- Nav Item - User Information -->*/}
					<ul className='navbar-nav ml-auto'>
						<div className="topbar-divider d-none d-sm-block"></div>

						<li className="nav-item dropdown no-arrow ">
							<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
								<span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.name}</span>
								<img className="img-profile rounded-circle" src={user?.avatar} alt="Jordan Walke - Creador de React" width="60" />
							</a>
						</li>
						<li className="nav-item dropdown no-arrow ">
							<i class="fa-solid fa-arrow-right-to-bracket nav-link dropdown-toggle" onClick={closeSession}></i>
						</li>
					</ul>
				</ul>

			</nav>
			{/*<!-- End of Topbar -->*/}

		</React.Fragment>
	)
}
export default TopBar;