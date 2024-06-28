import React, { useState } from "react";
import { Link } from "react-router-dom";
import favIcon from "../../assets/images/fav.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div>
        <h1>MovieStats</h1>
      </div>
      <div className={`navLinks ${isOpen ? "open" : ""}`}>
        <ul className="headerLinks">
          <li>
            <Link className="link" to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link className="fav" to="/fav" onClick={toggleMenu}>
              <img style={{ width: "30px" }} src={favIcon} alt="Favorites" />
            </Link>
          </li>
          <li>
            <Link className="link" to="" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="hamburger" role="button" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? (
          <span className="cross-icon"></span>
        ) : (
          <span className="hamburger-icon"></span>
        )}
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
    </header>
  );
}

export default Header;
