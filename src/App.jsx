import { Toaster } from "react-hot-toast";
import "./App.css";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelLayout from "./Components/HotelLayout/HotelLayout";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import { HotelsProvider } from "./Contexts/HotelsContext";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LocationList />} />
          <Route path="/hotels" element={<HotelLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>Single Hotel</div>} />
          </Route>
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
