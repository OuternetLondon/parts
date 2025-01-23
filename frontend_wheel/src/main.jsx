import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/userContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SocketProvider>
  </StrictMode>
);
