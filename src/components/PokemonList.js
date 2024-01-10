import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOfSet] = useState(0);

  useEffect(() => {
    loadPokemon();
  }, [offset]);

  async function loadPokemon() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}`
      );
      const data = await response.json();
      setPokemon(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNextPage() {
    setOfSet((offset) => offset + 20);
  }

  function handlePrevPage() {
    setOfSet((offset) => Math.max(0, offset - 20));
  }

  return (
    <main>
      <button onClick={handlePrevPage} disabled={offset === 0}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
