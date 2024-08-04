import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../Hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

let Initial_Option = {
  adult: 1,
  children: 0,
  room: 1,
};

let Initial_Date = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function Header() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  if (JSON.parse(searchParams.get("option"))) {
    Initial_Option = {
      adult: JSON.parse(searchParams.get("option")).adult,
      children: JSON.parse(searchParams.get("option")).children,
      room: JSON.parse(searchParams.get("option")).room,
    };
  }
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState(Initial_Option);

  if (JSON.parse(searchParams.get("date"))) {
    Initial_Date = {
      startDate: new Date(JSON.parse(searchParams.get("date")).startDate),
      endDate: new Date(JSON.parse(searchParams.get("date")).endDate),
      key: "selection",
    };
  }
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(Initial_Date);

  const navigate = useNavigate();

  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));

  const handleChangeOption = (operation, type) => {
    setOption((prev) => {
      return {
        ...prev,
        [type]: operation === "inc" ? option[type] + 1 : option[type] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      destination,
      date: JSON.stringify(date),
      option: JSON.stringify(option),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            id="destination"
            className="headerSearchInput textField"
            placeholder="Where to go ?"
          />

          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />

          <div
            id="dateDropDown"
            className="dateDropDown"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date.startDate, "MM/dd/yyyy")} to ${format(
              date.endDate,
              "MM/dd/yyyy"
            )}`}
          </div>

          <div ref={dateRef}>
            {openDate && (
              <DateRange
                className="date"
                ranges={[date]}
                onChange={(item) => setDate(item.selection)}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>

          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option.adult} Adult &bull; {option.children} Children &bull;{" "}
            {option.room} Room
          </div>

          {openOption && (
            <GuestOptionList
              option={option}
              onChangeOption={handleChangeOption}
              setOpenOption={setOpenOption}
            />
          )}

          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ option, onChangeOption, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));

  return (
    <div className="guestOptions" ref={optionRef}>
      <GuestOptionItem
        type="Adult"
        option={option}
        minLimit={1}
        onChangeOption={onChangeOption}
      />
      <GuestOptionItem
        type="Children"
        option={option}
        minLimit={0}
        onChangeOption={onChangeOption}
      />
      <GuestOptionItem
        type="Room"
        option={option}
        minLimit={1}
        onChangeOption={onChangeOption}
      />
    </div>
  );
}

function GuestOptionItem({ type, option, minLimit, onChangeOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={option[type.toLowerCase()] <= minLimit}
          onClick={() => onChangeOption("dec", type.toLowerCase())}
        >
          <HiMinus className="headerIcon" />
        </button>

        <span>{option[type.toLowerCase()]}</span>

        <button
          className="optionCounterBtn"
          onClick={() => onChangeOption("inc", type.toLowerCase())}
        >
          <HiPlus className="headerIcon" />
        </button>
      </div>
    </div>
  );
}
