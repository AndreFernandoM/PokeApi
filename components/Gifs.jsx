import Image from "next/image";
import Link from "next/link";

import { useState, useCallback } from "react";

import styles from "../styles/Gifs.module.css";

const Gifs = ({ pokemon, display }) => {
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
    <div>
      <div className={styles.gifImgButton}>
        <button
          className={`${styles.gifButtonTurn} ${display}`}
          onClick={setpokeBackSprites}
        >
          <Image
            src={"/images/rotate-arrow.png"}
            width={30}
            height={30}
            className={styles.gifRotateArrow}
            alt={"button to turn around"}
          />
        </button>
        <Image
          src={pokeSrc()}
          width={150}
          height={75}
          unoptimized={true}
          alt={pokemon.name}
          priority={false}
          className={styles.gifImg}
        />
      </div>

      <div className={`${styles.pokeInfo} ${display}`}>
        <button className={styles.gifButton} onClick={setPokeSprites}>
          {pokeSprites ? "Normal" : "Shiny"}
        </button>
      </div>
    </div>
  );
};

export default Gifs;
