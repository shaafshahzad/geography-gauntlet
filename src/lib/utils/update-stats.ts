export const updateStats = async (
  userId: string | undefined,
  target: string,
  value: number,
) => {
  if (userId) {
    try {
      fetch("/api/updateStats", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          target: target,
          value: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log("Update response:", data))
        .catch((error) => console.error("Failed to update stats", error));
    } catch (error) {
      console.error("Failed to update stats", error);
    }
  }
};
