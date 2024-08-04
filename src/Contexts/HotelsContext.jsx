import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const HotelsContext = createContext(null);

export function HotelsProvider({ children }) {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const room = JSON.parse(searchParams.get("option"))
    ? JSON.parse(searchParams.get("option")).room
    : 1;

  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `host_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelsContext.Provider value={{ hotels, isLoading }}>
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
