import { useEffect } from "react";
import { useHotels } from "../../Contexts/HotelsContext";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, isLoadingCurrHotel, getSingleHotel } = useHotels();

  const navigate = useNavigate();

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (isLoadingCurrHotel) {
    return <Loader />;
  }

  return (
    <div className="room">
      <div className="roomDetail">
        <button className="btn btn--back" onClick={() => navigate(-1)}>
          <HiChevronDoubleLeft /> Back
        </button>

        <h2>{currentHotel.name}</h2>

        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>

        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
