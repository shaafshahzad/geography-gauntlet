"use server";

import { api } from "~/trpc/server";

// Assuming you have functions to validate each type of question
export async function validateAnswer(
  questionId: number,
  answer: string,
  answerSearchParam: string,
) {
  switch (questionId) {
    case 1: // capital of country
    case 8: // country of capital
      return answer.toLowerCase() === answerSearchParam.toLowerCase();

    case 2: // country with some letters
      const countries = await api.gauntlet.getCountriesByLength({
        length: parseInt(answerSearchParam),
      });
      return countries.some(
        (country: { name: string }) =>
          country.name.toLowerCase() === answer.toLowerCase(),
      );

    case 3: // country starting with letter
      const countriesByStartLetter =
        await api.gauntlet.getCountriesByStartLetter({
          letter: answerSearchParam,
        });
      return countriesByStartLetter.some(
        (country: { name: string }) =>
          country.name.toLowerCase() === answer.toLowerCase(),
      );

    case 4: // country ending with letter
      const countriesByEndLetter = await api.gauntlet.getCountriesByEndLetter({
        letter: answerSearchParam,
      });
      return countriesByEndLetter.some(
        (country: { name: string }) =>
          country.name.toLowerCase() === answer.toLowerCase(),
      );

    case 5: // country with color in flag, expecting country name as answer
      const countriesWithColor = await api.gauntlet.getCountriesByColor({
        color: answerSearchParam,
      });
      return countriesWithColor.some(
        (country) => country.name.toLowerCase() === answer.toLowerCase(),
      );

    case 6: // population less than
    case 7: // population more than
      const isPopulationValid = await api.gauntlet.checkPopulation({
        country: answer.trim().toLowerCase(),
        population: parseInt(answerSearchParam),
        condition: questionId === 6 ? "less" : "greater",
      });
      return isPopulationValid;

    default:
      return false;
  }
}
