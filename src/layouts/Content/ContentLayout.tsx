import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ILayoutProps } from "../../models/ILayoutProps";
import { MainNavigation } from "../../components/main-navigation";
import "./ContentLayout.css";

export const ContentLayout = (props: ILayoutProps) => {
  return (
    <section className="content-layout">
      <Header />
      <section>
        <main className="main">
          <MainNavigation></MainNavigation>
          {props.children}
        </main>
      </section>
    </section>
  );
};
