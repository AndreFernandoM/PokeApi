import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Link href="/">
            <Image
              src="/images/pokeball.png"
              width={40}
              height={40}
              alt="Ultraball"
            />
          </Link>
          <h3 className={styles.title}>PokeAPI</h3>
        </div>
        <div className={styles.paths}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
