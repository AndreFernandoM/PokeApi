import styles from "../styles/Layout.module.css";

import Head from "next/head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Head>
          <title>POKEDEX</title>
          <link
            type="image/png"
            href="https://cdn-icons-png.flaticon.com/512/528/528101.png"
            rel="shortcut icon"
          />
        </Head>
        <Navbar />
        <div className="contents"> {children}</div>
        <Footer />
      </div>
    </>
  );
}
