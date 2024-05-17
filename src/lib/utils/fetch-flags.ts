interface Flag {
  country_id: string;
  name: string;
  flag_url: string;
}

export const fetchFlags = async (setCountryFlags: (flags: Flag[]) => void) => {
  try {
    const res = await fetch("/api/countryFlags", { method: "GET" });
    const flags = await res.json();
    setCountryFlags(flags);
  } catch (error) {
    console.error("Failed to start quiz", error);
  }
};
