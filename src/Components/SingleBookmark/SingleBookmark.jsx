import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../Contexts/BookmarksContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { HiChevronDoubleLeft } from "react-icons/hi";

function SingleBookmark() {
  const { id } = useParams();
  const { currentBookmark, getSingleBookmark, isLoading } = useBookmarks();

  const navigate = useNavigate();

  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        <HiChevronDoubleLeft /> Back
      </button>

      <h2>{currentBookmark.cityName}</h2>
      <span>{currentBookmark.country}</span>
    </div>
  );
}

export default SingleBookmark;
