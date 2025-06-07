import Image from 'next/image';
import Link from 'next/link';

const getTypeColor = (type) => {
  switch (type) {
    case 'grass': return 'bg-green-500';
    case 'fire': return 'bg-red-500';
    case 'water': return 'bg-blue-500';
    case 'bug': return 'bg-lime-500';
    case 'normal': return 'bg-gray-400';
    case 'poison': return 'bg-purple-600';
    case 'electric': return 'bg-yellow-400';
    case 'ground': return 'bg-amber-700';
    case 'fairy': return 'bg-pink-400';
    case 'fighting': return 'bg-orange-700';
    case 'psychic': return 'bg-pink-600';
    case 'rock': return 'bg-stone-500';
    case 'ghost': return 'bg-indigo-700';
    case 'ice': return 'bg-cyan-300 text-gray-800';
    case 'dragon': return 'bg-violet-600';
    case 'steel': return 'bg-slate-500';
    case 'dark': return 'bg-zinc-700';
    default: return 'bg-gray-500';
  }
};

const StatBar = ({ name, value }) => {
  const percentage = (value / 255) * 100; 
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300 capitalize">{name.replace('-', ' ')}</span>
        <span className="text-sm font-medium text-white">{value} / 255</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export default async function PokemonDetailPage({ params }) {
 try {

    const {name} = await params 
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const pokemon = await res.json();

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <main className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl shadow-yellow-400/10 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 md:gap-0 justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white capitalize">{pokemon.name}</h1>
              <p className="text-2xl text-gray-400 font-mono">#{String(pokemon.id).padStart(3, '0')}</p>
            </div>
            <div className="flex gap-2">
              {pokemon.types.map(typeInfo => (
                <span key={typeInfo.type.name} className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${getTypeColor(typeInfo.type.name)}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="flex justify-center items-center bg-gray-900/50 rounded-lg p-4">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                width={300}
                height={300}
                priority
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-yellow-400">Base Stats</h2>
              {pokemon.stats.map(statInfo => (
                <StatBar key={statInfo.stat.name} name={statInfo.stat.name} value={statInfo.base_stat} />
              ))}
            </div>
          </div>
          
          <div className="mt-8">
             <h2 className="text-2xl font-bold text-yellow-400 mb-4">Abilities</h2>
             <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(abilityInfo => (
                <span key={abilityInfo.ability.name} className="px-3 py-1 bg-gray-700 rounded-full text-gray-200 text-sm capitalize">
                  {abilityInfo.ability.name.replace('-', ' ')}
                </span>
              ))}
             </div>
          </div>
        </div>
      </main>
      <div className="text-center mt-8">
        <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
          ← Back to Explorer
        </Link>
      </div>
    </div>
  );

} catch (err) {
  console.error("Failed to fetch Pokémon:", err);
    return <div className="text-white p-4">Failed to load Pokémon data.</div>;
}
}