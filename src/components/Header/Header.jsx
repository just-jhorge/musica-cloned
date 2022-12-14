import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import SlideMenu from "./SlideMenu";
import logo from "../../assets/icons/logo.svg";

const Header = () => {
  const {
    setPlaylistBG,
    search,
    setSearch,
    searchFilter,
    tracksQueue,
    setTrackIndex,
    setCurrentTrack,
  } = useContext(Context);

  const searchRef = useRef(null);

  const mobileSearch = document.querySelector(".mobile-search");

  const toggleMobileMenu = () => {
    document.querySelector(".navMenuSlideDown").classList.toggle("-left-full");
    document.querySelector(".navMenuSlideDown").classList.toggle("top-0");
  };

  const handleClick = (e) => {
    toggleMobileMenu();
    setPlaylistBG(false);
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  const onInput = (e) => {
    setSearch(e.target.value);
  };

  const playSearch = (e) => {
    const key = e.currentTarget.getAttribute("data-id");
    let currentIndex;
    for (let i = 0; i < tracksQueue.length; i++) {
      if (tracksQueue[i].key == key) {
        currentIndex = i;
      }
    }

    setTrackIndex(parseInt(currentIndex));
    setCurrentTrack(currentIndex);
    setSearch("");
    mobileSearch.classList.add("scale-0");
  };

  const displaySearch = searchFilter.map((item) => {
    return (
      <div
        className="py-2 cursor-pointer hover:text-white"
        key={item.key}
        data-id={item.key}
        onClick={playSearch}
      >
        {item.title} ~ {item.subtitle}
      </div>
    );
  });

  const showMobileSearch = () => {
    mobileSearch.classList.remove("scale-0");
    searchRef.current.focus();
  };

  window.onclick = (e) => {
    if (e.target != document.querySelector(".search-result") && search !== "") {
      setSearch("");
      mobileSearch.classList.add("scale-0");
    }
  };
  return (
    <header className="py-6">
      <div className="flex items-center text-primary-grey overflow-auto">
        <button
          className="text-2xl text-white mr-5 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2330_441)">
              <path
                d="M4 8H20"
                stroke="#EFEEE0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 16H20"
                stroke="#EFEEE0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2330_441">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <img src={logo} height={34} alt="logo" className="mr-[35px]" />
        <nav className="flex items-center justify-end w-full">
          <svg
            onClick={showMobileSearch}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.75 23.75C19.2728 23.75 23.75 19.2728 23.75 13.75C23.75 8.22715 19.2728 3.75 13.75 3.75C8.22715 3.75 3.75 8.22715 3.75 13.75C3.75 19.2728 8.22715 23.75 13.75 23.75Z"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.25 26.25L20.8125 20.8125"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            ref={searchRef}
            onChange={onInput}
            value={search}
            placeholder="Search artiste"
            className="ml-5 bg-transparent placeholder:text-primary-grey focus:outline-0 block w-full"
          />
          <div className="lg:hidden mobile-search scale-0 transition-all absolute bg-dark-alt w-full left-0 h-16 top-0 flex">
            <input
              type="text"
              ref={searchRef}
              onChange={onInput}
              value={search}
              placeholder="Search artiste"
              className="ml-5 bg-transparent placeholder:text-primary-grey focus:outline-0 block w-full"
            />
            <button
              onClick={() => mobileSearch.classList.add("scale-0")}
              className="absolute text-white top-4 right-1"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </nav>
        <SlideMenu handleClick={handleClick} />
      </div>
      {search.length > 0 && (
        <div className="search-result text-secondary-grey left-0 py-4 px-4 lg:px-24 absolute z-50 bg-dark-alt w-full">
          {displaySearch}
        </div>
      )}
    </header>
  );
};

export default Header;
