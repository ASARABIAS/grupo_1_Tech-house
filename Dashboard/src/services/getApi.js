const BASE_URL=process.env.REACT_APP_BASE_URL

export const getAll = async (route) =>{
    const response = await fetch(`${BASE_URL}/${route}`);
    const data = await response.json();
    return data;
}

export const getById = async (route,id) =>{
    const response = await fetch(`${BASE_URL}/${route}/${id}`);
    const data = await response.json();
    return data;
}