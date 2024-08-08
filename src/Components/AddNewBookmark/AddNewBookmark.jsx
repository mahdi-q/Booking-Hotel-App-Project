import { HiChevronDoubleLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useLocationUrl from "../../Hooks/useLocationUrl";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";

const Base_GeoCoding_Url =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  const [lat, lng] = useLocationUrl();

  useEffect(() => {
    async function fetchLocationData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError(null);

        if (!lat && !lng)
          throw new Error(
            "You don't click anywhere for add to bookmark list! Please click somewhere."
          );

        const { data } = await axios.get(
          `${Base_GeoCoding_Url}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.cityName && !data.country && !data.countryCode)
          throw new Error(
            "This location is not a city! Please click somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <ErrorComponent>{geoCodingError}</ErrorComponent>;

  return (
    <div className="addNewBookmark">
      <h2>Bookmark New Location</h2>

      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag svg countryCode={countryCode} className="flag" />
        </div>

        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <HiChevronDoubleLeft />
            Back
          </button>

          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
