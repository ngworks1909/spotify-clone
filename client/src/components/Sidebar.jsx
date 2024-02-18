import React from "react";
import "../css/Sidebar.css";
import logo from "../assets/sploginlogo.png";
import LibraryLogo from "../logos/LibraryLogo";
import HomeLogo from "../logos/HomeLogo";
import SearchLogo from "../logos/SearchLogo";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MobileState } from "../states/MobileState";

export default function Sidebar() {
  const mobile = useRecoilValue(MobileState);
  const setMobile = useSetRecoilState(MobileState);
  return (
    <>
      <div className="sidebar display-flex flex-column">
        <div className="sidebar-top">
          <div className="sidebar-top-elements">
            <div className="logo-element color-white display-flex align-center">
              <input
                type="image"
                src={logo}
                className="sidebar-spotify-logo"
                alt=""
              />
              
            </div>
            <div className="sidebar-links display-flex flex-column">
              <Link
                to="/"
                className="sidebar-link display-flex align-center space-gap"
              >
                <HomeLogo />
                <span className="sidebar-link-text">Home</span>
              </Link>
              <Link
                to="/"
                className="sidebar-link display-flex align-center space-gap gap-item"
              >
                <SearchLogo />
                <span className="sidebar-link-text">Search</span>
              </Link>
            
            </div>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-bottom-elements">
            <div className="fixed-wrapper">
              <div className={`fixed-item`}>
                <div className="fixed-item-container display-flex align-center justify-between">
                  <Link
                    to="/"
                    className="sidebar-link display-flex align-center gap-10"
                  >
                    <LibraryLogo />
                    <span className="sidebar-link-text">Your Library</span>
                  </Link>
                  <HiOutlinePlus
                    size={20}
                    className="cursor-pointer plus-icon"
                  />
                </div>
              </div>
              <div
                className="sidebar-bottom-container display-flex flex-column"
                id="sidebar-bottom-container"
              >
                <div className="create-playlist-container display-flex flex-column justify-between">
                  <div className="container-text display-flex flex-column">
                    <span className="container-header-text color-white">
                      Create your first playlist
                    </span>
                    <span className="container-footer-text color-white">
                      It's easy, we'll help you
                    </span>
                  </div>
                  <button className="create-playlist-button cursor-pointer">
                    Create Playlist
                  </button>
                </div>
                <div className="create-playlist-container display-flex flex-column justify-between">
                  <div className="container-text display-flex flex-column">
                    <span className="container-header-text color-white">
                      Let's find some podcats to follow
                    </span>
                    <span className="container-footer-text color-white">
                      We'll keep you updated on new episodes
                    </span>
                  </div>
                  <button className="create-playlist-button cursor-pointer">
                    Browse Podcats
                  </button>
                </div>
              </div>
            </div>
            <div className="cookies cursor-pointer"><span className="cookies-handler">Cookies</span></div>
            <div className="world-english color-white display-flex align-center">
               <TbWorld className="world-icon"/>
               <span className="world-text">English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className={`mobile-menu display-flex flex-column justify-between ${mobile? 'mobile-open' : 'mobile-close'}`}>
      <div className="mobile-top-elements">
            <div className="logo-element color-white display-flex align-center justify-between">
              <input
                type="image"
                src={logo}
                className="sidebar-spotify-logo"
                alt=""
              />
              <RxCross2 size={20} className="color-white cursor-pointer" onClick={(e) => {
                e.preventDefault();
                setMobile(false);
              }}/>
            </div>
            <div className="sidebar-links display-flex flex-column">
              <Link
                to="/"
                className="sidebar-link display-flex align-center space-gap"
              >
                <HomeLogo />
                <span className="sidebar-link-text">Home</span>
              </Link>
              <Link
                to="/"
                className="sidebar-link display-flex align-center space-gap gap-item"
              >
                <SearchLogo />
                <span className="sidebar-link-text">Search</span>
              </Link>
              <Link
                to="/"
                className="sidebar-link display-flex align-center space-gap gap-item"
              >
                <LibraryLogo />
                <span className="sidebar-link-text">Your Library</span>
              </Link>
              
            </div>
          </div>
          <div className="mobile-bottom-elements display-flex flex-column">
              <div className="cookies cursor-pointer mobile-cookies"><span className="cookies-handler">Cookies</span></div>
              <div className="world-english color-white display-flex mobile-world align-center">
               <TbWorld className="world-icon"/>
               <span className="world-text">English</span>
            </div>
              </div>
      </div>
    </>
  );
}
