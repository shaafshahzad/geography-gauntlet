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
  const templateId = 1;
  const templateResponse = await api.gauntlet.getQuestion({
    question_id: templateId,
  });
  const templateData = templateResponse.length > 0 ? templateResponse[0] : null;
  if (!templateData || !templateData.template) {
    throw new Error("Question template data is missing or incomplete.");
  }

  let question;
  switch (templateData.question_id) {
    case 1:
    case 9:
      question = templateData.template
        .replace("{country}", country.name)
        .replace("{capital}", country.capital);
      break;
  }

  // replace the placeholders in the template with the actual data

  return {
    question, // e.g., "What is the capital of Italy?"
    country, // The country object fetched from the database
  };
}
