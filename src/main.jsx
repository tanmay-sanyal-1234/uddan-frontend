import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";s
// Optional: import your custom CSS file if you have one
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import './index.css'
import App from './App.jsx'
import { store } from "./store";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
