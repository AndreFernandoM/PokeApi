import Image from "next/image";
import Link from "next/link";

import { useState, useCallback } from "react";

import styles from "../styles/PokeCard.module.css";

export default function PokeCard({ pokemon }) {
  let ext = ".gif";

  pokemon.id <= 649 ? (ext = ".gif") : (ext = ".png");

  const front_default = `/images/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}${ext}`;
  const front_shiny = `/images/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon.id}${ext}`;
  const back_default = `/images/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon.id}${ext}`;
  const back_shiny = `/images/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/${pokemon.id}${ext}`;

  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState((state) => !state), []);

    return [state, toggle];
  };
  const [pokeSprites, setPokeSprites] = useToggle();

  const [pokeBackSprites, setpokeBackSprites] = useToggle(false);

  const pokeSrc = () =>
    pokeSprites
      ? pokeBackSprites
        ? back_shiny
        : front_shiny
      : pokeBackSprites
      ? back_default
      : front_default;

  return (
    <>
      <div className={styles.cardContainer}>
        <span className={styles.cardTitle}>
          <h3>{pokemon.name} </h3>
          <span className={styles.cardIdBox}>
            <p> #{pokemon.id}</p>
          </span>
        </span>
        <hr />
        <div className={styles.cardImgButton}>
          <button
            className={styles.cardButtonTurn}
            onClick={setpokeBackSprites}
          >
            <Image
              src={"/images/rotate-arrow.png"}
              width={30}
              height={30}
              className={styles.cardRotateArrow}
              alt={"button to turn around"}
            />
          </button>
          <Image
            src={pokeSrc()}
            width={200}
            height={125}
            unoptimized={true}
            alt={pokemon.name}
            priority={false}
            className={styles.cardImg}
          />
        </div>
        <div className={styles.pokeInfo}>
          <button className={styles.cardButton} onClick={setPokeSprites}>
            {pokeSprites ? "Normal" : "Shiny"}
          </button>
          <Link href={`/pokemon/${pokemon.id}`} className={styles.cardInfo}>
            More Info
          </Link>
        </div>
      </div>
    </>
  );
}
