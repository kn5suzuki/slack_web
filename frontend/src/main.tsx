import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import Header from "./components/Header.tsx";
import { Configuration } from "./api-client/configuration.ts";
import { DefaultApi } from "./api-client/api.ts";

const config = new Configuration({
  basePath: import.meta.env.VITE_BACKEND_URL,
});
export const apiClient = new DefaultApi(config);
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>
);
