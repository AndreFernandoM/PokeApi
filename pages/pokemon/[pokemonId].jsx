import styles from "../../styles/Pokemon.module.css";

import Image from "next/image";
import Gifs from "../../components/Gifs";

import { pokeSrc } from "../index";
import Link from "next/link";

export const getStaticPaths = async () => {
  const fs = require("fs");

  const maxPoke = 905;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPoke}`);

  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: index.toString() }
    };
  });
  fs.writeFileSync("pokeData.json", JSON.stringify(data));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const fs = require("fs");

  const id = context.params.pokemonId;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await res.json();

  fs.writeFileSync("pokeData.json", JSON.stringify(data));

  return {
    props: { pokemon: data }
  };
};

export default function Pokemon({ pokemon }) {
  const classMap = {
    normal: styles.Normal,
    fighting: styles.Fighting,
    flying: styles.Flying,
    poison: styles.Poison,
    ground: styles.Ground,
    rock: styles.Rock,
    bug: styles.Bug,
    ghost: styles.Ghost,
    steel: styles.Steel,
    fire: styles.Fire,
    water: styles.Water,
    grass: styles.Grass,
    electric: styles.Electric,
    psychic: styles.Psychic,
    ice: styles.Ice,
    dragon: styles.Dragon,
    dark: styles.Dark,
    fairy: styles.Fairy
  };

  let pokeColor = false;

  return (
    <>
      <h1>{pokemon.name}</h1>
      <div className={styles.types}>
        {pokemon.types.map((item, i) => {
          const divClass = classMap[item.type.name] || classMap.default;
          pokeColor ? null : (pokeColor = divClass);
          return (
            <div key={i} className={divClass}>
              {item.type.name}
            </div>
          );
        })}
      </div>
      <div>
        <Gifs pokemon={pokemon} />
      </div>
      <div className={styles.statsWeight}>{pokemon.weight / 10}kg</div>
      <div className={styles.statsHeight}>{pokemon.height / 10}m</div>
      <hr />
      {pokemon.stats.map((item, i) => {
        return (
          <div key={i}>
            <div className={styles.statsName}>{item.stat.name}</div>
            <div className={styles.statsNum}>{item.base_stat} </div>
            <progress
              max="300"
              value={item.base_stat}
              className={`${styles.statsBar} ${pokeColor}`}
            />
            {console.log(pokeColor)}
            <hr />
          </div>
        );
      })}

      {pokemon.id == 1 ? (
        <></>
      ) : (
        <Link href={`/pokemon/${pokemon.id - 1}`} className={styles.backButton}>
          Back
        </Link>
      )}
      <Link href={`/pokemon/${pokemon.id + 1}`} className={styles.backNext}>
        Next
      </Link>
    </>
  );
}
