import styles from "../../styles/Pokemon.module.css";

// import Image from "next/image";
import Gifs from "../../components/Gifs";

// import { pokeSrc } from "../index";
import Link from "next/link";
import Image from "next/image";

export const getStaticPaths = async () => {
  const fs = require("fs");

  const maxPoke = 905;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPoke}`);

  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() }
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

  const display = "none";

  {
    pokemon.types.map((item) => {
      const divClass = classMap[item.type.name] || classMap.default;
      pokeColor ? null : (pokeColor = divClass);
      return divClass;
    });
  }

  return (
    <>
      <div className={`${styles.pokeInfoContainer} ${pokeColor}`}>
        <div className={styles.pokeTopContainer}>
          <div className={styles.pokeTitleContainer}>
            {pokemon.id == 1 ? (
              <></>
            ) : (
              <span>
                <Link
                  href={`/pokemon/${pokemon.id - 1}`}
                  className={styles.backButton}
                >
                  {"<"}
                </Link>
              </span>
            )}
            <h1 style={{ color: "white" }}>
              {pokemon.name}
              {pokemon.id < 10 ? (
                <span style={{ fontSize: "16px", fontWeight: "200" }}>
                  #00{pokemon.id}
                </span>
              ) : pokemon.id < 100 ? (
                <span style={{ fontSize: "16px", fontWeight: "200" }}>
                  #0{pokemon.id}
                </span>
              ) : (
                <span style={{ fontSize: "16px", fontWeight: "200" }}>
                  #{pokemon.id}
                </span>
              )}
            </h1>
            <span>
              <Link
                href={`/pokemon/${pokemon.id + 1}`}
                className={styles.nextButton}
              >
                {">"}
              </Link>
            </span>
          </div>
          <div>
            <Image
              src={`/images/pokemon-single-sprites/${pokemon.id}.png`}
              width={150}
              height={75}
              unoptimized={true}
              alt={pokemon.name}
              priority={false}
              className={styles.pokeImg}
            />
          </div>
        </div>
        <div className={`${styles.pokeInfoMiniContainer} ${pokeColor}`}>
          <div className={styles.pokeTopInfo}>
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
            <h3>About</h3>
          </div>
          <div className={styles.pokeWeightHeight}>
            <div className={styles.pokeStatsWeightHeight}>
              <Image
                src="/images/balance.png"
                width={16}
                height={16}
                alt={"Balance Icon"}
              />
              {pokemon.weight / 10}kg
            </div>
            <hr />
            <div className={styles.pokeStatsWeightHeight}>
              <Image
                src="/images/ruler.png"
                width={8}
                height={16}
                alt={"Ruler Icon"}
              />
              {pokemon.height / 10}m
            </div>
          </div>

          <hr />
          <div className={styles.pokeStatsContainer}>
            <div className={styles.pokeStatsContent}>
              {pokemon.stats.map((item, i) => {
                return (
                  <div key={i}>
                    <div className={styles.statsName}>{item.stat.name}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.pokeStatsContent2}>
              {pokemon.stats.map((item, i) => {
                return (
                  <div key={i} className={styles.pokeStatsNumbers}>
                    <div className={styles.statsNum}>{item.base_stat} </div>
                    <progress
                      max="300"
                      value={item.base_stat}
                      className={`${styles.statsBar}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
