import { MdLocationOn, MdLogin, MdLogout, MdMenu } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../Hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

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

  const { user, isAuthenticated, logout } = useAuth();

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
      <div className="header__wellcome-text">
        {isAuthenticated && <span>Hi, {user.name}</span>}
      </div>

      <div className="header__search">
        <div className="header__search-item">
          <MdLocationOn className="search__icon location" />

          <input
            className="search__input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            id="destination"
            placeholder="Where to go ?"
          />
        </div>

        <div className="header__search-item">
          <HiCalendar className="search__icon date" />

          <div
            className="search__date-dropDown"
            id="dateDropDown"
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
                className="date-dropDown"
                ranges={[date]}
                onChange={(item) => setDate(item.selection)}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>
        </div>

        <div className="header__search-item">
          <div
            className="search__options-dropDown"
            id="optionDropDown"
            onClick={() => setOpenOption(!openOption)}
          >
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
        </div>

        <div className="header__search-item">
          <button className="search__btn" onClick={handleSearch}>
            <HiSearch className="search__icon" />
          </button>
        </div>
      </div>

      <div className="header__action-btns">
        <UserAuthentication
          isAuthenticated={isAuthenticated}
          logout={logout}
          navigate={navigate}
        />

        <Menu />
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ option, onChangeOption, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));

  return (
    <div className="options-dropDown" ref={optionRef}>
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
    <div className="option-item">
      <span className="option__text">{type}</span>

      <div className="option__counter">
        <button
          className="option__counter__btn"
          disabled={option[type.toLowerCase()] <= minLimit}
          onClick={() => onChangeOption("dec", type.toLowerCase())}
        >
          <HiMinus className="search__icon option" />
        </button>

        <span>{option[type.toLowerCase()]}</span>

        <button
          className="option__counter__btn"
          onClick={() => onChangeOption("inc", type.toLowerCase())}
        >
          <HiPlus className="search__icon option" />
        </button>
      </div>
    </div>
  );
}

function UserAuthentication({ isAuthenticated, logout, navigate }) {
  const handleAuthentication = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="header__action-btn">
      <button onClick={handleAuthentication} className="btn btn--primary">
        {isAuthenticated ? (
          <>
            <span>Logout</span>
            <MdLogout className="header__icon logout" />
          </>
        ) : (
          <>
            <span>Login</span>
            <MdLogin className="header__icon login" />
          </>
        )}
      </button>
    </div>
  );
}

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef();
  useOutsideClick(menuRef, "menuDropDown", () => setOpenMenu(false));

  return (
    <div className="header__action-btn">
      <button
        className="btn btn--primary"
        id="menuDropdown"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <MdMenu className="header__icon" />
      </button>

      {openMenu && (
        <div className="menu-links" ref={menuRef}>
          <div className="menu__link">
            <NavLink to={"/"} style={{ display: "block" }}>
              Home
            </NavLink>
          </div>

          <div className="menu__link">
            <NavLink to={"/hotels"} style={{ display: "block" }}>
              Hotels
            </NavLink>
          </div>

          <div className="menu__link">
            <NavLink to={"/bookmarks"} style={{ display: "block" }}>
              Bookmarks
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
