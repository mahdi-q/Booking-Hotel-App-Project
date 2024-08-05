import { useEffect } from "react";
import { useHotels } from "../../Contexts/HotelsContext";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, isLoadingCurrHotel, getSingleHotel } = useHotels();  

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (isLoadingCurrHotel) {
    return <Loader />;
  }

  return (
    <div className="room">
      <div className="roomDetail">
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
