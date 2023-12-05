"use client";
import styles from "./page.module.css";
import { useUser } from "../lib/useApi";

export default function Page(): JSX.Element {
  const { userName } = useUser();
  return (
    <main className={styles.main}>
      <h1>Hello, {userName}</h1>
    </main>
  );
}
