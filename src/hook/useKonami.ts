import { useEffect, useRef } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const normalizeKey = (key: string) => (key.length === 1 ? key.toLowerCase() : key);

export const useKonami = (onCode: () => void) => {
  const callbackRef = useRef(onCode);

  useEffect(() => {
    callbackRef.current = onCode;
  }, [onCode]);

  useEffect(() => {
    let buffer: string[] = [];

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = normalizeKey(event.key);

      buffer = [...buffer, key].slice(-KONAMI_SEQUENCE.length);

      if (
        buffer.length === KONAMI_SEQUENCE.length &&
        buffer.every((value, index) => value === KONAMI_SEQUENCE[index])
      ) {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
