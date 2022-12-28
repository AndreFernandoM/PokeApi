import styles from "../styles/Home.module.css";

import Image from "next/image";
import { useState } from "react";

import PokeCard from "../components/PokeCard";

export async function getStaticProps() {
  const fs = require("fs");
  const maxPoke = 905;
  const api = "https://pokeapi.co/api/v2/pokemon/";

  const res = await fetch(`${api}/?limit=${maxPoke}`);

  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  fs.writeFileSync("pokeData.json", JSON.stringify(data));

  return {
    props: {
      pokemons: data.results
    }
  };
}

export default function Home({ pokemons }) {
  const [showMore, setShowMore] = useState(false);

  const [showTen, setShowTen] = useState(151);

  return (
    <>
      <div className={styles.container}>
        <h1>PokeAPI</h1>
        <Image
          src="/images/star.png"
          width={50}
          height={50}
          alt={"Logo PokeEstrela"}
        />
      </div>
      <div className={styles.pokeContainer}>
        {pokemons.map((pokemon, index) =>
          index < showTen ? (
            <PokeCard pokemon={pokemon} key={pokemon.id} />
          ) : (
            <></>
          )
        )}
      </div>
      <div className={styles.showMoreContainer}>
        <button
          onClick={() => {
            setShowTen(showTen + 50);
          }}
          className={styles.showMoreButton}
        >
          {showTen < 950 ? "Mostrar Mais" : "Mostrar Menos"}
        </button>
      </div>
    </>
  );
}

// {pokemons.map((pokemon, index) =>
//   !showMore ? (
//     index < 151 ? (
//       <PokeCard pokemon={pokemon} key={pokemon.id} />
//     ) : (
//       <div key={pokemon.id} />
//     )
//   ) : (
//     <PokeCard pokemon={pokemon} key={pokemon.id} />
//   )
// )}

// onClick={() => {
//   setShowMore(!showMore);
// }}
