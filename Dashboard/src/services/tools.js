
import Error from "../components/Error";
import Loading from "../components/Loading";

export const loading = () =><Loading/>

export const error = () =><Error/>

export const checkToken = () =>document.cookie ?document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]:'';

