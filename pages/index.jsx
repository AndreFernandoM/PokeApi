import styles from "../styles/Home.module.css";

import Image from "next/image";

import LazyLoad from "react-lazy-load-image-component";

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
  return (
    <>
      {/* {pokemon.id.sprites.front_default} */}
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
        {pokemons.map((pokemon) => (
          <PokeCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </>
  );
}
