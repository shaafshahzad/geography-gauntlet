import { db } from "~/server/db";
import { api } from "~/trpc/react";

export default async function Home() {
  const countries = await db.query.countries.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#67636d] to-[#9294be]">
      {countries.map((country) => (
        <div
          key={country.country_id}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-black bg-gray-800 p-4"
        >
          <h1 className="text-4xl font-bold text-white">{country.name}</h1>
          <p className="text-xl text-white">{country.capital}</p>
          <p className="text-xl text-white">{country.population}</p>
          <p className="text-xl text-white">{country.flag_color}</p>
        </div>
      ))}
    </main>
  );
}
