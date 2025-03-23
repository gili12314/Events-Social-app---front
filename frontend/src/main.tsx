import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthContextProvider>
        <App />       
    </AuthContextProvider>
);


axios.defaults.baseURL = "http://localhost:3000/api";


function TokenInterceptor(config : InternalAxiosRequestConfig) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

axios.interceptors.request.use(TokenInterceptor);