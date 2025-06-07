import Image from "next/image";


export default function Loading() {
  return (
     <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Image src={'/loading.gif'} alt="pikachu dancing gif from the movie" width={200} height={200} />
      <p className="text-xl text-white">Loading Pokémon...</p>
    </main>
  );
}