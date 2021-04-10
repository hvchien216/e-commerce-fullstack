import Copyright from "@components/Copyright";
import NavBar from "@components/Navbar";
import { Container, CssBaseline } from "@material-ui/core";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import apiProduct from "@redux/product/api";
import { Product } from "@redux/product/types";
type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
};

function Layout({ children, className, title = "Next.js Ecommerce" }: Props) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>{title}</title>
        {/* <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Static Tweet Next.js Demo" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://static-tweet.now.sh/assets/twitter-card.png" />
        <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <CssBaseline />
      <NavBar />
      <Container component="main">
        <>
          {children}
          <Copyright />
        </>
      </Container>
    </React.Fragment>
  );
}

export default Layout;
