import {DictionaryFlashcard} from "./dictionary-flashcard";
import {KanaFlashcard} from "./kana-flashcard";
import {KanjiFlashcard} from "./kanji-flashcard";
import {PhraseFlashcard} from "./phrase-flashcard";

export type FullKanaFlashcard = DictionaryFlashcard & KanaFlashcard;
export type FullKanjiFlashcard = DictionaryFlashcard & KanjiFlashcard;
export type FullPhraseFlashcard = DictionaryFlashcard & PhraseFlashcard;

export type Flashcard = FullKanaFlashcard | FullKanjiFlashcard | PhraseFlashcard;
