import { useEffect } from "react";
import { useHotels } from "../../Contexts/HotelsContext";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronDoubleLeft, HiOutlineClock } from "react-icons/hi";

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
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        <HiChevronDoubleLeft /> Back
      </button>

      <div className="room__detail">
        <img className="room__image" src={currentHotel.xl_picture_url} alt={currentHotel.name} />

        <div className="room__info">
          <h2 className="name">{currentHotel.name}</h2>

          <div className="review">
            <strong>{currentHotel.number_of_reviews}</strong> reviews &bull;{" "}
            {currentHotel.smart_location}
          </div>

          <div className="type">
            {currentHotel.property_type} &bull; {currentHotel.room_type} &bull;{" "}
            {currentHotel.bed_type}
          </div>

          <p className="price">
            <strong>{currentHotel.price}&nbsp;€</strong>&nbsp;<span>night</span>
          </p>

          <div className="update">
            <HiOutlineClock />
            {currentHotel.calendar_updated}&nbsp;updated
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
