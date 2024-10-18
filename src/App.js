import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/Main";
import Navbar from "./component/navbar/Navbar";
import CountryDetailPage from "./pages/detail-country/CountryDetailPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AssociatedCountry from "./pages/associated-country/AssociatedCountry";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route
              path="/"
              element={<MainPage />}
            />
            <Route
              path="/country/:id"
              element={<CountryDetailPage />}
            />
            <Route
              path="/associated-country"
              element={<AssociatedCountry />}
            />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </Provider>
  );
}