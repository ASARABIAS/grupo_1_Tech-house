import { useState, useRef, useEffect } from "react"
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { post } from '../../../services/getApi';


const Login = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const messenger = useRef();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //Función para obtener el token de autenticación
    const login = (e) => {
        //Evitar que el formulario haga submit
        e.preventDefault()
        //Llamar a la API para obtener el token de autenticación
        if (form && Object.keys(form).length > 1) {
            messenger.current.innerHTML = 'Cargando...';
            post('users/login', form)
                .then(data => {
                    if (data.status === 200) {
                        document.cookie = `token=${data.data.token}; max-age=${data.data.expiresIn}, path=/; same-site=strict`;
                        navigate('/');
                    } else {
                        messenger.current.innerHTML = 'Error ' + data.data.error;
                    }
                })
                .catch(err => messenger.current.innerHTML = 'Error: servidor no resposnde');
        }else{
            messenger.current.innerHTML = 'Por favor llene los campos';
        }

    }

    //Función para validar el token de autenticación

    return (
        <Modal
            show={true}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title >Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { login(e) }}>
                    <FormGroup controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <FormControl type="email" placeholder="Enter email" name="email" onChange={(e) => handleChange(e)} />
                    </FormGroup>
                    <FormGroup controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <FormControl type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    </FormGroup>
                    <FormGroup controlId="formBasicPassword">
                        <p Style={'color:red; margin-top:10px'} ref={messenger}></p>
                    </FormGroup>
                    <FormGroup className="m-4">
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
