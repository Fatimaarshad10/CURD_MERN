import React  ,{useState ,useEffect}from 'react'
import '../css/new.css'
import { useLocation } from 'react-router-dom';
function New() {
  const location = useLocation();

  useEffect(() => {
    // Responsive-navbar-active-animation
    function test() {
      const tabsNewAnim = document.getElementById('navbarSupportedContent');
      const selectorNewAnim = tabsNewAnim.querySelectorAll('li').length;
      const activeItemNewAnim = tabsNewAnim.querySelector('.active');
      const activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
      const activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
      const itemPosNewAnimTop = activeItemNewAnim.offsetTop;
      const itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
      document.querySelector('.hori-selector').style.top = `${itemPosNewAnimTop}px`;
      document.querySelector('.hori-selector').style.left = `${itemPosNewAnimLeft}px`;
      document.querySelector('.hori-selector').style.height = `${activeWidthNewAnimHeight}px`;
      document.querySelector('.hori-selector').style.width = `${activeWidthNewAnimWidth}px`;

      tabsNewAnim.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', (e) => {
          tabsNewAnim.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
          e.target.closest('li').classList.add('active');
          const activeWidthNewAnimHeight = e.target.closest('li').offsetHeight;
          const activeWidthNewAnimWidth = e.target.closest('li').offsetWidth;
          const itemPosNewAnimTop = e.target.closest('li').offsetTop;
          const itemPosNewAnimLeft = e.target.closest('li').offsetLeft;
          document.querySelector('.hori-selector').style.top = `${itemPosNewAnimTop}px`;
          document.querySelector('.hori-selector').style.left = `${itemPosNewAnimLeft}px`;
          document.querySelector('.hori-selector').style.height = `${activeWidthNewAnimHeight}px`;
          document.querySelector('.hori-selector').style.width = `${activeWidthNewAnimWidth}px`;
        });
      });
    }

    test();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        test();
      }, 500);
    });

    document.querySelector('.navbar-toggler').addEventListener('click', () => {
      document.querySelector('.navbar-collapse').slideToggle(300);
      setTimeout(() => {
        test();
      });
    });

    // add active class-on another-page move
    const path = location.pathname.split('/').pop() || 'index.html';
    const target = document.querySelector(`#navbarSupportedContent ul li a[href="${path}"]`);
    if (target) {
      target.closest('li').classList.add('active');
    }
  }, [location]);
  return (
  <>
<nav class="navbar navbar-expand-custom navbar-mainbg">
        <a class="navbar-brand navbar-logo" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="fas fa-tachometer-alt"></i>Home</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-address-book"></i> Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-clone"></i>Users</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-calendar-alt"></i>  Contact</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-chart-bar"></i>logout</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-copy"></i>Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);"><i class="far fa-copy"></i>Login
                    </a>
                </li>
            </ul>
        </div>
    </nav>
  </>
  )
}

export default New