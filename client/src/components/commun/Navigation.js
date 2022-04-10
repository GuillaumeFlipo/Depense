import React from "react";
import { NavLink } from "react-router-dom";
import page_ from "../../fonction_js/page_info";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { icon } from '@fortawesome/fontawesome-svg-core';

// import { useState } from 'react'

const Navigation = ({ bol_transparent }) => {
  // const [toggleIcon, setToggleIcon] = useState(faBars);
  const [toggleBol, setToggleBol] = useState(false);
  const [scrollPageAvant, setScrollPageAvant] = useState(0);

  const pageData = useSelector((state) => state.pageReducer);

  const navigationList = [
    {
      navName: "Qui sommes nous ?",
      path: "/",
      sousMenu: false,
    },
    {
      navName: "Notre programme",
      path: "/programme",
      sousMenu: false,
    },
    {
      navName: "Liens utiles",
      path: "/liens_utiles",
      sousMenu: false,
    },
    {
      navName: "F.A.Q",
      path: "/FAQ",
      sousMenu: false,
    },
  ];

  const [sousMenuBoll, setSousMenuBoll] = useState([]);

  function handleClickToggle(classN) {
    let menu_mobile = document.getElementsByClassName(classN);
    let icon = document.querySelector(".toggleclass");
    icon.classList.toggle("activeIcon");

    for (let values of menu_mobile) {
      if (toggleBol == true) {
        values.style.display = "none";
        values.style.animationName = "disparitionMenuMobile";
        setToggleBol(false);
      } else {
        values.style.display = "flex";
        values.style.animationName = "apparitionMenuMobile";
        setToggleBol(true);
      }
    }
  }

  function resetmenu() {
    let menu_mobile = document.getElementById("nav_items_containerID");
    let sousMenu = document.getElementsByClassName("sous_menu");

    if (page_.getXmax() > 800) {
      // values.style.animationName="";
      let icon = document.querySelector(".toggleclass");
      menu_mobile.style.display = "flex";
      for (let values of sousMenu) {
        values.style.display = "none";
        values.style.animationName = "";
      }
      setSousMenuBoll([]);
      setToggleBol(false);
      icon.classList.remove("activeIcon");
    } else {
      if (toggleBol == false) {
        menu_mobile.style.display = "none";
        // setToggleIcon(faBars);
      } else {
        menu_mobile.style.display = "flex";
        // setToggleIcon(faTimes);
      }
    }
  }
  function sousMenuClick(id, numero) {
    if (pageData.widthScreen < 800) {
      let sousMenu = document.getElementById(id);
      let transitionVariable = sousMenuBoll;
      let numeroBis = numero + 1;
      document
        .querySelector(
          `.sous_menu_container:nth-of-type(${numeroBis}) div:first-child .iconSousMenu`
        )
        .classList.toggle("activeIcon");
      // let li =sousMenu.querySelectorAll('li');
      if (sousMenuBoll[numero] == false) {
        sousMenu.style.animationName = "apparitionMenusousClick";
        sousMenu.style.display = "flex";
        // sousMenu.style.height = "auto";
        transitionVariable[numero] = true;
        setSousMenuBoll(transitionVariable);
      } else {
        sousMenu.style.animationName = "";
        // sousMenu.style.height = "0px";
        sousMenu.style.display = "none";
        transitionVariable[numero] = false;
        setSousMenuBoll(transitionVariable);
      }
    }
  }
  function sousMenuHover(bol, id) {
    if (pageData.widthScreen > 799) {
      let sousMenu = document.getElementById(id);
      if (bol == true) {
        sousMenu.style.display = "flex";
        sousMenu.style.animationName = "appatitionSousMenu";
      } else {
        sousMenu.style.display = "none";
        sousMenu.style.animationName = "";
      }
    }
  }

  function ColorActive() {
    const li = document.getElementsByClassName("sous_menu_container");
    for (let value of li) {
      const p = value.querySelector("p");
      if (pageData.widthScreen > 800 && pageData.scrollPage > 1) {
        p.style.color = "white";
      }
      if (pageData.widthScreen <= 800) {
        p.style.color = "rgb(30,30,30)";
      }
      if (
        pageData.widthScreen > 800 &&
        pageData.scrollPage <= 1 &&
        bol_transparent == true
      ) {
        p.style.color = "rgb(30,30,30)";
      }
      if (
        pageData.widthScreen > 800 &&
        pageData.scrollPage <= 1 &&
        bol_transparent == false
      ) {
        p.style.color = "white";
      }
    }
    // if  = true) {
    //   const p = document.getElementByI);
    //   p.style.color = "#ae952e";
    // }
  }

  function transparantMenu() {
    if (bol_transparent == true) {
      let menu = document.getElementsByClassName("navigation");
      let menuContainer = document.getElementsByClassName(
        "nav_items_container"
      );

      for (let value_2 of menuContainer) {
        // let value_a=value_2.querySelectorAll('a');
        let value_a = value_2.children;

        for (let value of menu) {
          if (page_.getScrollPage() <= 1) {
            value.style.backgroundColor = "transparent";
            value.style.border = "none";
            if (pageData.widthScreen > 800) {
              for (let value_i of value_a) {
                value_i.style.color = "rgb(30,30,30)";
              }
            }
          } else {
            value.style.backgroundColor = "rgba(2, 102, 24,0.99)";
            value.style.borderBottom = "solid 3px #ae952e";
            if (pageData.widthScreen > 800) {
              for (let value_i of value_a) {
                value_i.style.color = "white";
              }
            }
          }
          if (pageData.widthScreen <= 800) {
            for (let value_i of value_a) {
              value_i.style.color = "rgb(30,30,30)";
            }
          }
        }
      }
    }
  }
  function disparitionMenu() {
    let menu_mobile = document.getElementsByClassName("navigation");
    for (let value of menu_mobile) {
      if (
        page_.getScrollPage() > scrollPageAvant &&
        page_.getScrollPage() > page_.getYmax()
      ) {
        value.style.display = "none";
      } else {
        value.style.display = "flex";
      }
    }
    setScrollPageAvant(page_.getScrollPage());
  }

  useEffect(() => {
    resetmenu();
    ColorActive();
    transparantMenu();
  }, [pageData.widthScreen]);
  useEffect(() => {
    disparitionMenu();
    transparantMenu();
    ColorActive();
  }, [pageData.scrollPage]);

  return (
    <div className="navigation">
      <NavLink exact="true" to="/" id="logo">
        <img className="logo" src="./logo.png" alt="logo Newparadigms" />
      </NavLink>

      <p
        className="toggleclass pointer"
        onClick={() => handleClickToggle("nav_items_container")}
      >
        <span></span>
        <span></span>
        <span></span>
      </p>
      <ul className="nav_items_container" id="nav_items_containerID">
        {navigationList.map((value) =>
          value.sousMenu === false ? (
            <NavLink
              key={value.navName.toString()}
              exact="true"
              to={value.path}
              className="Nav_item"
            >
              <li>{value.navName}</li>
            </NavLink>
          ) : (
            <li
              key={value.navName.toString()}
              className="sous_menu_container"
              onMouseEnter={() => sousMenuHover(true, value.navName)}
              onMouseLeave={() => sousMenuHover(false, value.navName)}
            >
              <div
                className="pointer"
                onClick={() => {
                  sousMenuClick(value.navName, value.numero);
                }}
              >
                <p id={`p${value.numero.toString()}ID`}>{value.navName}</p>
                {pageData.widthScreen < 800 && (
                  <div className="iconSousMenu pointer">
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>

              <ul className="sous_menu" id={value.navName}>
                {value.sousMenuList.map((value_sous) => (
                  <NavLink
                    key={value_sous.sousMenuName}
                    exact="true"
                    to={value_sous.path}
                    className="Nav_item nav_item_sous"
                    id={`p${value.numero.toString()}ID`}
                  >
                    {value_sous.sousMenuName}
                  </NavLink>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Navigation;

// onMouseEnter={ () => sousMenuHover(true)} onMouseLeave={ () => sousMenuHover(false)}
