import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/About.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>POKEDEX - info</title>
        {/* <link
          type="image/png"
          href="https://cdn-icons-png.flaticon.com/512/528/528098.png"
          rel="icon"
        /> */}
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Sobre o Projeto</h1>
        <p className={styles.text}>
          Projeto feito com o intuito de treinar o uso de Next.js e o consumo de
          API <br />
          <span>
            Autor:{" "}
            <Link target="_blank" href="https://github.com/AndreFernandoM">
              André Fernando Machado
            </Link>
          </span>
        </p>
        <Image
          src="/images/pokedex.png"
          width={300}
          height={300}
          alt="pokedex"
          className={styles.img}
        />
      </div>
    </>
  );
}
