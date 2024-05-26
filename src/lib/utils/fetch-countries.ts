"use server";

import { api } from "~/trpc/server";

export const fetchCountries = async () => {
  try {
    const countries = await api.countryQuiz.getCountries();
    return countries;
  } catch (error) {
    console.error("Failed to start quiz", error);
  }
};
