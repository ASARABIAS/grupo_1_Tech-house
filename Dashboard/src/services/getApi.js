const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAll = async (route) => {
    const response = await fetch(`${BASE_URL}/${route}`);
    const data = await response.json();
    return data;
}

export const getById = async (route, id) => {
    const response = await fetch(`${BASE_URL}/${route}/${id}`);
    const data = await response.json();
    return data;
}

export const post = async (route, form) => {
    const response = await fetch(`${BASE_URL}/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
    const data = await response.json();
    return data;
}

export const verifyUser = async (token) => {
    const response = await fetch(`${BASE_URL}/check`, {
        headers: {
            'authorization': token //Atención acá, el token se envía en el header de la petición
        }
    });
    const data = await response.json();
    return data;
}