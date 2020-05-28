import {StandardDictionaryHandler} from "./standard-dictionary-handler";
import {FileDictionaryHandler} from "./file-dictionary-handler";

const config = require('config');

let dictionaryHandler: StandardDictionaryHandler;

const regenerateDictionaryHandler = (): StandardDictionaryHandler => {
    let workingDictionaryHandler: StandardDictionaryHandler;
    switch (config.get('app.dictionary')) {
        case 'file':
        default:
            workingDictionaryHandler = new FileDictionaryHandler(config.get('dictionary.file'));
    }
    return workingDictionaryHandler;
}

const resolveDictionaryHandler = (): StandardDictionaryHandler => {
    if (dictionaryHandler === undefined) {
        dictionaryHandler = regenerateDictionaryHandler();
    }
    return dictionaryHandler;
}

export default resolveDictionaryHandler;
