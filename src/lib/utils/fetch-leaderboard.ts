"use server";

import { api } from "~/trpc/server";

export const fetchLeaderboard = async (value: string) => {
  try {
    const leaderboard = await api.user.getLeaderboard({ value });
    return leaderboard;
  } catch (error) {
    console.error("Failed to retrieve leaderboard", error);
    return null;
  }
};
