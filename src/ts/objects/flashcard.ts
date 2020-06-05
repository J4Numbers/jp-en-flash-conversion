import {DictionaryFlashcard} from "./dictionary-flashcard";
import {KanaFlashcard} from "./kana-flashcard";
import {KanjiFlashcard} from "./kanji-flashcard";

export type FullKanaFlashcard = DictionaryFlashcard & KanaFlashcard;
export type FullKanjiFlashcard = DictionaryFlashcard & KanjiFlashcard;

export type Flashcard = FullKanaFlashcard | FullKanjiFlashcard;
