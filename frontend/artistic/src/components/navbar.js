import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../css/new.css";
import $ from "jquery";
function App() {
  const navigate = useNavigate();
  const userLogin = () => {
    console.log("user remove");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin === "true") {
    var admit = admin;
  } else {
    var admit = "";
  }

  const location = useLocation();

  useEffect(() => {
    // Responsive-navbar-active-animation
    function test() {
      const tabsNewAnim = document.getElementById("navbarSupportedContent");
      const selectorNewAnim = tabsNewAnim.querySelectorAll("li").length;
      const activeItemNewAnim = tabsNewAnim.querySelector(".active");
      if (activeItemNewAnim) {
        const activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
        const activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
        const itemPosNewAnimTop = activeItemNewAnim.offsetTop;
        const itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
        document.querySelector(
          ".hori-selector"
        ).style.top = `${itemPosNewAnimTop}px`;
        document.querySelector(
          ".hori-selector"
        ).style.left = `${itemPosNewAnimLeft}px`;
        document.querySelector(
          ".hori-selector"
        ).style.height = `${activeWidthNewAnimHeight}px`;
        document.querySelector(
          ".hori-selector"
        ).style.width = `${activeWidthNewAnimWidth}px`;
      }
      tabsNewAnim.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", (e) => {
          tabsNewAnim
            .querySelectorAll("li")
            .forEach((li) => li.classList.remove("active"));
          e.target.closest("li").classList.add("active");
          const activeWidthNewAnimHeight = e.target.closest("li").offsetHeight;
          const activeWidthNewAnimWidth = e.target.closest("li").offsetWidth;
          const itemPosNewAnimTop = e.target.closest("li").offsetTop;
          const itemPosNewAnimLeft = e.target.closest("li").offsetLeft;
          document.querySelector(
            ".hori-selector"
          ).style.top = `${itemPosNewAnimTop}px`;
          document.querySelector(
            ".hori-selector"
          ).style.left = `${itemPosNewAnimLeft}px`;
          document.querySelector(
            ".hori-selector"
          ).style.height = `${activeWidthNewAnimHeight}px`;
          document.querySelector(
            ".hori-selector"
          ).style.width = `${activeWidthNewAnimWidth}px`;
        });
      });
    }

    test();

    window.addEventListener("resize", () => {
      setTimeout(() => {
        test();
      }, 500);
    });

    $(".navbar-toggler").on("click", () => {
      $(".navbar-collapse").slideToggle(300);
      setTimeout(() => {
        test();
      });
    });

    // add active class-on another-page move
    const path = location.pathname.split("/").pop() || "index.html";
    const target = document.querySelector(
      `#navbarSupportedContent ul li a[href="${path}"]`
    );
    if (target) {
      target.closest("li").classList.add("active");
    }
  }, [location]);
  return (
    <nav class="navbar navbar-expand-custom navbar-mainbg ">
      
      <a class="navbar-brand navbar-logo" href="#">
      Artistic
      </a>
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars text-white"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <div class="hori-selector">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          {JSON.parse(localStorage.getItem("user")) ? (
            <>
              <li class="nav-item">
                <Link className="nav-Link a" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item active">
                <Link className="nav-Linka" to="/products">
                  Products
                </Link>
              </li>

              {admit ? (
                <li class="nav-item">
                  <Link className="nav-Link a" to="/users">
                    Users
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li class="nav-item">
                <Link className="nav-Link a" to="/contact">
                  Contact
                </Link>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="javascript:void(0);"
                  onClick={() => userLogin()}
                >
                  logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item">
                <Link className="nav-link a" to="/register">
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-Link a" to="/login">
                  login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default App;
