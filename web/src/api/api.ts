import axios from "axios";

export class StaticVars {
    setErrorPopup: (title: string | null, message: string | null) => void;

    constructor() {
        this.setErrorPopup = (title: string | null, message: string | null) => {
        }
    }

}


//const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"
const current_domain = window.location.hostname;
const backend_url = process.env.NODE_ENV === 'development' ? "https://tekbetter.ovh" : `https://${current_domain}`

const api = axios.create({
    baseURL: `${backend_url}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth')
    }
});


api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if (!error.response)
        vars.setErrorPopup("Network error", "An error occured with the api server, please try again later.");
    else if (error.response.status === 401) {
        if (window.location.pathname !== "/auth")
            window.location.href = "/auth";
    }

    // if (!error.response) {
    //     myAlert.setMaintenance(true);
    // }
    //
    // if (!is_remote && error.response.status === 401 && window.location.pathname !== "/login") {
    //     window.location.href = "/login";
    // }
    // if (error.response.status === 500) {
    //     myAlert.open("Erreur", "Une erreur serveur est survenue, veuillez réessayer plus tard.");
    // }
    return Promise.reject(error);
});


export default api
const vars = new StaticVars();
export {vars}