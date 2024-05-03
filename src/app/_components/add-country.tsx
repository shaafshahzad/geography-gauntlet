"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import countries from "~/app/lib/utils/countries.json";

export function AddCountry() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const { mutateAsync } = api.country.addCountry.useMutation();

  const addCountries = async () => {
    setIsAdding(true);
    const countryData = Object.entries(countries).map(([name, details]) => ({
      name,
      capital: details.capital,
      population: details.population.toString(),
      flag_color: details.flagColors.join(", "), // Assuming flag colors are stored as a comma-separated string
    }));

    for (const country of countryData) {
      await mutateAsync(country); // Assuming your mutation takes the whole country object
    }

    setIsAdding(false);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={addCountries}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      disabled={isAdding}
    >
      {isAdding ? "Adding Countries..." : "Add Countries"}
    </button>
  );
}
