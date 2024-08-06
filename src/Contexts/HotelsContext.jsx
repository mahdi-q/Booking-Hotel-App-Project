import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext(null);

const Base_Url = "http://localhost:5000/hotels";

export function HotelsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);

  const destination = searchParams.get("destination") || "";
  const room = JSON.parse(searchParams.get("option"))
    ? JSON.parse(searchParams.get("option")).room
    : 1;

  const { data: hotels, isLoading } = useFetch(
    Base_Url,
    `host_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getSingleHotel(id) {
    try {
      setIsLoadingCurrHotel(true);
      const { data } = await axios.get(`${Base_Url}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        isLoading,
        currentHotel,
        isLoadingCurrHotel,
        getSingleHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export const useHotels = () => {
  const context = useContext(HotelsContext);
  if (context === undefined)
    throw new Error("HotelsContext was used outside of HotelsProvider.");
  return context;
};
