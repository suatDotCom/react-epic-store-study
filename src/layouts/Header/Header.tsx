import React, { useContext } from "react";
import "./Header.css";
import shieldLogo from "../../assets/img/shield_logo.png";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Language } from "../../enums/language.enum";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Context } from "../../store";
import { LOGOUT } from "../../store/types/user.type";
import { getCurrentUser } from "../../shared/storage/UserStorage";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //@ts-ignore
  const [state, dispatch] = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  const isLoggedIn = (): boolean => {
    let loggedIn: boolean = false;

    if (getCurrentUser()) {
      loggedIn = true;
    }

    return loggedIn;
  };

  return (
    <header className="epic-header">
      <div className="flex-container">
        <div className="flex-item">
          <a href="#">
            <img src={shieldLogo} alt="" className="shield-logo" />
          </a>
          <ul className="epic-navbar">
            <li>
              <a href="#" onClick={() => navigate("/")}>
                {t("navigation.buttons.store")}
              </a>
            </li>
            {/* <li>
              <a href="#faq">{t("navigation.buttons.faq")}</a>
            </li>
            <li>
              <a href="#help">{t("navigation.buttons.help")}</a>
            </li>
            <li>
              <a href="#unreal">UNREAL ENGINE</a>
            </li> */}
            {isLoggedIn() && (
              <li>
                <a href="#" onClick={() => navigate("/my-library")}>
                  {t("navigation.buttons.myLibrary")}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-item">
          <ul className="epic-navbar">
            <li>
              <a
                href="#"
                onClick={handleClick}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <LanguageIcon />
              </a>
            </li>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setLanguage(Language.TR);
                  handleClose();
                }}
              >
                Türkçe
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLanguage(Language.EN);
                  handleClose();
                }}
              >
                English
              </MenuItem>
            </Menu>
            <li>
              {isLoggedIn() ? (
                <a
                  href="#logout"
                  onClick={() => {
                    dispatch({
                      type: LOGOUT,
                    });
                    navigate("/");
                  }}
                >
                  {t("navigation.buttons.logout")}{" "}
                </a>
              ) : (
                <a href="#login" onClick={() => navigate("/login")}>
                  {t("navigation.buttons.login")}{" "}
                </a>
              )}
            </li>
            {/* <li>
              <a
                className="bg-color-blue epic-download-button"
                href="#download"
              >
                {t("navigation.buttons.download")}
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
};
