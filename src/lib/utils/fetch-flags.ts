"use server";

import { api } from "~/trpc/server";

export const fetchFlags = async () => {
  try {
    const countryFlags = await api.flagQuiz.getCountryFlags();
    countryFlags.sort(() => Math.random() - 0.5);
    return countryFlags;
  } catch (error) {
    console.error("Failed to start quiz", error);
  }
};
