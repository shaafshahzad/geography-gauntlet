"use server";

import { api } from "~/trpc/server";

function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

export async function validateAnswer(
  questionId: number,
  answer: string,
  answerSearchParam: string,
) {
  const sanitizedAnswer = sanitizeInput(answer);
  const sanitizedAnswerSearchParam = sanitizeInput(answerSearchParam);

  switch (questionId) {
    case 1: // capital of country
    case 8: // country of capital
      return sanitizedAnswer === sanitizedAnswerSearchParam;

    case 2: // country with some letters
      const countries = await api.gauntlet.getCountriesByLength({
        length: parseInt(answerSearchParam),
      });
      return countries.some(
        (country: { name: string }) =>
          sanitizeInput(country.name) === sanitizedAnswer,
      );

    case 3: // country starting with letter
      const countriesByStartLetter =
        await api.gauntlet.getCountriesByStartLetter({
          letter: answerSearchParam,
        });
      return countriesByStartLetter.some(
        (country: { name: string }) =>
          sanitizeInput(country.name) === sanitizedAnswer,
      );

    case 4: // country ending with letter
      const countriesByEndLetter = await api.gauntlet.getCountriesByEndLetter({
        letter: answerSearchParam,
      });
      return countriesByEndLetter.some(
        (country: { name: string }) =>
          sanitizeInput(country.name) === sanitizedAnswer,
      );

    case 5: // country with color in flag, expecting country name as answer
      const countriesWithColor = await api.gauntlet.getCountriesByColor({
        color: answerSearchParam,
      });
      return countriesWithColor.some(
        (country) => sanitizeInput(country.name) === sanitizedAnswer,
      );

    case 6: // population less than
    case 7: // population more than
      const isPopulationValid = await api.gauntlet.checkPopulation({
        country: sanitizedAnswer,
        population: parseInt(answerSearchParam),
        condition: questionId === 6 ? "less" : "greater",
      });
      return isPopulationValid;

    default:
      return false;
  }
}
