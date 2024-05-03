import { api } from "~/trpc/server";

export async function generateQuestion() {
  // get a random country
  const countryId = Math.floor(Math.random() * 196) + 1;
  const countryResponse = await api.gauntlet.getCountry({
    country_id: countryId,
  });
  const country = countryResponse.length > 0 ? countryResponse[0] : null;
  if (!country || !country.name) {
    throw new Error("Country data is missing or incomplete.");
  }

  // get a random question template
  const templateId = Math.floor(Math.random() * 8) + 1;
  const templateResponse = await api.gauntlet.getQuestion({
    question_id: templateId,
  });
  const templateData = templateResponse.length > 0 ? templateResponse[0] : null;
  if (!templateData || !templateData.template) {
    throw new Error("Question template data is missing or incomplete.");
  }

  let question;
  switch (templateData.question_id) {
    case 1: // capital of country
    case 8: // country of capital
      question = templateData.template
        .replace("{country}", country.name)
        .replace("{capital}", country.capital);
      break;
    case 2: // country with some letters
      const value = Math.floor(Math.random() * 8) + 4;
      question = templateData.template.replace("{value}", value.toString());
      break;
    case 3: // country starting with letter
    case 4: // country ending with letter
      const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      question = templateData.template.replace("{letter}", letter);
      break;
    case 5: // country with color in flag
      const colors = ["red", "green", "blue", "yellow", "black", "white"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      question = templateData.template.replace("{color}", color || ""); // TO FIX (color is not defined in the template)
      break;
    case 6: // population less than
    case 7: // population more than
      const population =
        Math.round((Math.floor(Math.random() * 100000000) + 5000000) / 100000) *
        100000;
      const formattedPopulation = population.toLocaleString();
      question = templateData.template.replace("{value}", formattedPopulation);
      break;
    default:
      throw new Error("Invalid question template ID.");
  }

  return {
    question,
    template: templateData.template,
  };
}
