import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import shieldLogo from "../../../assets/img/shield_logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Context } from "../../../store";
import { IUser } from "../../../models/user/IUser";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./Login.css";
import { LOGIN } from "../../../store/types/user.type";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //@ts-ignore
  const [state, dispatch] = useContext(Context);

  const [loginStatus, setLoginStatus] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const userControl = (currentUser: IUser): boolean => {
    let loginStatus = false;
    let users = JSON.parse(localStorage.getItem("registeredUsers")!);

    let hasUser = users?.filter(
      (registeredUser: IUser) => registeredUser.email === currentUser.email
    );

    if (hasUser?.length > 0 && hasUser[0]?.password === currentUser.password) {
      loginStatus = true;
    } else {
      setAlert({
        type: "error",
        message: "Username or password incorrect.",
      });
      setBackdropOpen(true);

      setTimeout(() => {
        setBackdropOpen(false);
      }, 2000);
    }

    return loginStatus;
  };

  const onSubmit = (data: any) => {
    let currentUser: IUser = {
      email: data.email,
      password: data.password,
    };

    if (userControl(currentUser)) {
      dispatch({
        type: LOGIN,
        payload: currentUser,
      });

      setAlert({
        type: "success",
        message: "Successfully logged in.",
      });
      setBackdropOpen(true);
      //simulation
      setTimeout(() => {
        navigate("/my-library");
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="shield-logo-container">
          <img src={shieldLogo} alt="" className="shield-logo" />
        </div>

        <h6 className="account-message mt-5">
          <span>{t("login.texts.epicAccountLoginMessage")}</span>
        </h6>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="row mt-3">
              <TextField
                required
                value={email}
                label={t("login.texts.email")}
                type="text"
                {...register("email")}
                error={errors?.email?.message != null}
              />
              <span className="error-message">
                {/* @ts-ignore */}
                {errors?.email?.message}
              </span>
            </div>
            <div className="row mt-3">
              <TextField
                required
                value={password}
                label={t("login.texts.password")}
                type="password"
                {...register("password")}
                error={errors?.password?.message != null}
              />
              <span className="error-message">
                {/* @ts-ignore */}
                {errors?.password?.message}
              </span>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={t("login.texts.rememberMe")}
                />
              </div>
              <div className="col-md-6 mt-2">
                <a href="#">  {t('login.buttons.forgotPassword')} </a>
              </div>
            </div>
            <div className="row mt-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={Object.keys(errors).length > 0}
              >
                {t("login.buttons.login")}
              </Button>
            </div>

            <div className="row mt-5 text-center">
              <a href="#">{t('login.buttons.privacyPolicy')}</a>
            </div>
            <div className="row mt-3">
              <span>
              {t('login.texts.dontHaveEpicGameAccount')}{" "}
                <a href="#register" onClick={() => navigate("/register")}>
                {t('login.buttons.register')}
                </a>
              </span>
            </div>
            <div className="row mt-3 text-center">
              <a href="#store" onClick={() => navigate("/")}>
              {t('login.buttons.backToStore')}
              </a>
            </div>
          </div>
        </form>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={backdropOpen} autoHideDuration={6000}>
        {/* @ts-ignore */}
        <Alert severity={alert.type} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
