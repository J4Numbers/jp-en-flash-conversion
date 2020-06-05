/*
 * MIT License
 *
 * Copyright (c) 2020 J4Numbers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as uuid from 'uuid';
import {StandardFlashcardHandler} from "./standard-flashcard-handler";
import {ModuleBundle} from "../objects/module-bundle";
import {MemoryFlashcardConfig} from "../objects/memory-flashcard-config";
import * as dictionaryResolver from "../dictionary"
import {StandardDictionaryHandler} from "../dictionary/standard-dictionary-handler";
import {FlashcardBundle} from "../objects/flashcard-bundle";
import {Flashcard} from "../objects/flashcard";

export class MemoryFlashcardHandler extends StandardFlashcardHandler {
    standardDictionary: StandardDictionaryHandler;

    flashcardOrganiser: { [key: string]: FlashcardBundle }

    constructor(memoryFlashcardConfig: MemoryFlashcardConfig) {
        super();
        this.standardDictionary = dictionaryResolver.default();
        this.flashcardOrganiser = {};
    }

    async registerNewFlashcardRevision(flashcardRequest: ModuleBundle): Promise<string> {
        const newFlashcardDeck = uuid.v4();
        this.flashcardOrganiser[newFlashcardDeck] = await this.standardDictionary
            .returnDictionary(Object.values(flashcardRequest).flat(1));
        return newFlashcardDeck;
    }

    async retrieveNextFlashcard(flashcardToken: string): Promise<Flashcard> {
        if (this.flashcardOrganiser[flashcardToken] === undefined) {
            throw new Error('No more flashcards to read');
        }
        const flashcardToReturn = this.flashcardOrganiser[flashcardToken].shift() as Flashcard;
        if (this.flashcardOrganiser[flashcardToken].length === 0) {
            delete this.flashcardOrganiser[flashcardToken];
        }
        return flashcardToReturn;
    }
}
