import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ToastProvider from "./utils/common/toast/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <App />
    </ToastProvider>
  </BrowserRouter>
);
