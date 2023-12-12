"use client";
import { useUser } from "../lib/useApi";

export default function Page(): JSX.Element {
  const { userName } = useUser();
  return <h1>Hello, {userName}</h1>;
}
