import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//app
import App from "./app";

const basename: string = import.meta.env.VITE_APP_BASE_PATH

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter basename={basename}>
        <App/>
    </BrowserRouter>
  </StrictMode>
);