import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../shared/storage/UserStorage";
import { SearchInput } from "../search";
import "./MainNavigation.css";

export const MainNavigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isLoggedIn = (): boolean => {
    let loggedIn: boolean = false;

    if (getCurrentUser()) {
      loggedIn = true;
    }

    return loggedIn;
  };

  return (
    <div className="main-navigation-container">
      <SearchInput />
      <div className="menu-container">
        <ul className="main-navigation">
          {isLoggedIn() && (
            <>
              <li className="navigation-item">
                <a href="#favorites" onClick={() => navigate("/my-library")}>
                  {t("navigation.buttons.favoriteGames")}
                </a>
              </li>
              <li className="navigation-item">
                <a href="#purchased" onClick={() => navigate("/my-library")}>
                  {t("navigation.buttons.purchased")}
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
