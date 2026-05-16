import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
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
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

const container = document.getElementById('root');
const rootElement = (
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, rootElement);
} else {
  createRoot(container).render(rootElement);
}
