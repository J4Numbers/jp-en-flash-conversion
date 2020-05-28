import {StandardFlashcardHandler} from "./standard-flashcard-handler";
import {MemoryFlashcardHandler} from "./memory-flashcard-handler";

const config = require('config');

let flashcardHandler: StandardFlashcardHandler;

const regenerateFlashcardHandler = (): StandardFlashcardHandler => {
    let workingFlashcardHandler: StandardFlashcardHandler;
    switch (config.get('app.flashcards')) {
        case 'memory':
        default:
            workingFlashcardHandler = new MemoryFlashcardHandler(config.get('flashcards.memory'));
    }
    return workingFlashcardHandler;
}

const resolveFlashcardHandler = (): StandardFlashcardHandler => {
    if (flashcardHandler === undefined) {
        flashcardHandler = regenerateFlashcardHandler();
    }
    return flashcardHandler;
}

export default resolveFlashcardHandler;
