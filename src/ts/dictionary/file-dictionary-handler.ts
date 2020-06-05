import * as fs from 'fs';
import * as path from 'path';
import {FlashcardBundle} from "../objects/flashcard-bundle";
import {StandardDictionaryHandler} from "./standard-dictionary-handler";
import {FileDictionaryConfig} from "../objects/file-dictionary-config";
import {ModuleName} from "../objects/module-name";
import {ModuleList} from "../objects/module-list";
import {AvailableDictionaries} from "../objects/available-dictionaries";
import {AvailableModules} from "../objects/available-modules";

const fileRegex = /[a-zA-Z]+_([0-9]+)\.json/

const fileSort = (a: string, b: string) => {
    const aRegex = fileRegex.exec(a);
    const bRegex = fileRegex.exec(b);
    if (aRegex && bRegex) {
        return Number.parseInt(aRegex[1]) - Number.parseInt(bRegex[1]);
    } else if (aRegex) {
        return 1;
    } else if (bRegex) {
        return -1;
    } else {
        return 0;
    }
};

export class FileDictionaryHandler extends StandardDictionaryHandler{
    constructor(fileDictionaryConfig: FileDictionaryConfig) {
        super();
    }

    async returnDictionaryPack(packName: ModuleName): Promise<FlashcardBundle> {
        const parts = /(hiragana|katakana|kanji|compound)-([0-9]+)/;
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

    async returnAvailableModules(): Promise<AvailableModules> {
        const availableModules: AvailableModules = {};
        Object.keys(AvailableDictionaries).forEach((dictionary) => {
            if (fs.existsSync(path.resolve('locale/en', dictionary))) {
                availableModules[dictionary] = fs.readdirSync(path.resolve('locale/en', dictionary))
                    .sort(fileSort)
                    .map((localeName) => JSON.parse(
                        fs.readFileSync(
                            path.resolve('locale/en', dictionary, localeName)).toString('utf-8'),
                        ),
                    );
            }
        });
        return availableModules;
    }
}
