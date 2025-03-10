import { useState, useEffect } from "react";
import "./style/sign.scss";
import SignIMG from "./assets/sign.png";
import { BsBehance, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaHome, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

function Sign() {
  return (
    <div className="sign">
      <img className="sign-img" src={SignIMG} alt="panneau suspendu" />
      <div className="sign-content">
        <span>Welcome to...</span>
        <h1>Cielesis's lofi cafe</h1>
        <span>Enjoy your stay !</span>
        <div className="sign-content-socials">
          <a
            href="https://www.cielesis.fr"
            target="_blank"
            className="sign-content-socials-item"
          >
            <FaHome />
          </a>
          <a
            href="https://www.behance.net/allancote1#"
            target="_blank"
            className="sign-content-socials-item"
          >
            <BsBehance />
          </a>
          <a
            href="https://www.linkedin.com/in/cielesis/"
            target="_blank"
            className="sign-content-socials-item"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://x.com/koffi_cup"
            target="_blank"
            className="sign-content-socials-item"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.instagram.com/koffi_cup/"
            target="_blank"
            className="sign-content-socials-item"
          >
            <BsInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sign;
