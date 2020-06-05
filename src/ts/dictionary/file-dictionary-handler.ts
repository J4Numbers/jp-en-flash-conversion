import * as fs from 'fs';
import * as path from 'path';
import {FlashcardBundle} from "../objects/flashcard-bundle";
import {StandardDictionaryHandler} from "./standard-dictionary-handler";
import {FileDictionaryConfig} from "../objects/file-dictionary-config";
import {ModuleName} from "../objects/module-name";
import {ModuleList} from "../objects/module-list";

export class FileDictionaryHandler extends StandardDictionaryHandler{
    constructor(fileDictionaryConfig: FileDictionaryConfig) {
        super();
    }

    async returnDictionaryPack(packName: ModuleName): Promise<FlashcardBundle> {
        const parts = /(hiragana|katakana|kanji)-([0-9]+)/;
        const packParts = parts.exec(packName);
        let bundle: FlashcardBundle = [];
        if (packParts) {
            bundle = fs.readdirSync(path.resolve('dictionary', packParts[1], `${packParts[1]}-${packParts[2]}`))
                .map((fileName) => fs
                    .readFileSync(
                        path.resolve('dictionary', packParts[1], `${packParts[1]}-${packParts[2]}`, fileName),
                    ).toString('utf-8'))
                .map((inputFile) => JSON.parse(inputFile));
        }
        return bundle;
    }

    async returnDictionary(packNames: ModuleList): Promise<FlashcardBundle> {
        const promisedDictionary = packNames.map(this.returnDictionaryPack);
        const fulfilledDictionary = await Promise.all(promisedDictionary);
        return fulfilledDictionary.flat(1);
    }
}
