'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();
      setAllPokemon(data.results);
      setFilteredPokemon(data.results);
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const results = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(results);
  }, [searchTerm, allPokemon]);

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-8 font-mono">
          Pokémon Explorer
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>


        {
          Array.isArray(filteredPokemon) && filteredPokemon?.length > 0 ?
            <>
              <div className='w-full text-sm text-center mb-8'>Pokémon from the OG 151:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                {filteredPokemon.map((pokemon) => {
                  const pokemonId = pokemon.url.split('/')[6];
                  return (
                    <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                      <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center aspect-square transform hover:scale-105 hover:bg-gray-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_0_3px_#FFFF00]">
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                          alt={pokemon.name}
                          width={96}
                          height={96}
                          className="h-20 w-20 sm:h-24 sm:w-24"
                        />
                        <h2 className="text-md sm:text-lg font-semibold text-gray-200 capitalize mt-2">
                          {pokemon.name}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
            : (
              <div className='w-full text-center'>No Pokémon Found.</div>
            )
        }

      </div>
    </main>
  );
}