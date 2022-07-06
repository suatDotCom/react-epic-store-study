import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ContentLayout } from "./layouts/Content/ContentLayout";
import { IUser } from "./models/user/IUser";
import { AllGames } from "./pages/AllGames";
import { Login, ProtectedRoute, Register } from "./pages/Auth";
import { Home } from "./pages/Home";
import { MyLibrary } from "./pages/MyLibrary";

/*
 * Routes component containing routes for the whole application
 * @returns {JSX}
 */
const MainRouter = () => {
  const getCurrentUser = (): IUser | null => {
    let user = JSON.parse(localStorage.getItem("currentUser")!);
    return user;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ContentLayout>
              <Home />
            </ContentLayout>
          }
        ></Route>
        <Route path="/all-games" element={<ContentLayout><AllGames /></ContentLayout>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/my-library"
          element={
            <ProtectedRoute user={getCurrentUser()}>
              <ContentLayout>
                <MyLibrary />
              </ContentLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
