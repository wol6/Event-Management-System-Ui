import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKENDURL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        const message = error.response?.data?.message;
        
        if (message) {
            toast.warning(`Error: ${message}`);
        } else if (error.request) {
            toast.error("Network Error: Cannot connect to the server.");
        } else {
            toast.error(`Unexpected Error: ${error.message}`);
        }
        console.log(error)

        return Promise.reject(error);
    }
);

export default api;
