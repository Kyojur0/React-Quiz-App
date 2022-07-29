import { shuffleArray } from "./utils";

export enum Mode {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
} // this will ensure it accepts nothing but these vals  

export enum QuestionField {
    GENERAL_KNOWLEDGE = 9,
    BOOKS = 10,
    FILM = 11,
    MUSIC = 12,
    MUSICALS_THEATRES = 13,
    TELEVISION = 14,
    VIDEO_GAMES = 15,
    BOARD_GAMES = 16,
    NATURE = 17,
    COMPUTERS = 18,
    MATHEMATICS = 19,
    MYTHOLOGY = 20,
    SPORTS = 21,
    GEOGRAPHY = 22,
    HISTORY = 23,
    POLITICS = 24,
    ART = 25,
    CELEBRITIES = 26,
    ANIMALS = 27,
    VEHICLES = 28,
    COMICS = 29,
    GADGETS = 30,
    JAPANESE_ANIME_MANGA = 31,
    CARTOON_ANIMATIONS	= 32,
} // tell what kind of questions you want to answer ??

export enum choice {
    MULTIPLE_CHOICE_QUESTIONS = "multiple",
    TRUE_FALSE = "boolean"
} // select the question format true false/mcq kinda 

export type Question = {
    category:          string;
    type:              string;
    difficulty:        string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
} // bruh this is imp `getting the types right` 

export type QuestionState = Question & { answer: string[] }

export const fetchQuizQuestion = async (amount: number, lvlOfDifficulty: Mode, 
    type: QuestionField, questionFormat: choice) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${lvlOfDifficulty}&type=${questionFormat}&category=${type}`;
    console.log("the api is: " + endPoint);
    const data: {results: Question[]} = await (await fetch(endPoint)).json();
    console.log("holy shit bro wtf ?");
    console.log(data.results[2].category);
    return data.results.map((question: Question) => ({
        ...question,
        answer: shuffleArray([...question.incorrect_answers,question.correct_answer,]),
    }));
}
