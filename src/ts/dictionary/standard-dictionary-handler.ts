import {FlashcardBundle} from "../objects/flashcard-bundle";
import {ModuleName} from "../objects/module-name";
import {ModuleList} from "../objects/module-list";
import {AvailableModules} from "../objects/available-modules";

export abstract class StandardDictionaryHandler {
    abstract async returnDictionaryPack(packName: ModuleName): Promise<FlashcardBundle>;

    abstract async returnDictionary(packNames: ModuleList): Promise<FlashcardBundle>;

    abstract async returnAvailableModules(): Promise<AvailableModules>;
}
