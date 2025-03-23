import ReactDOM from "react-dom/client";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthContextProvider>
        <App />       
    </AuthContextProvider>
);