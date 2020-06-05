import {ModuleList} from "./module-list";
import {ModuleDescription} from "./module-description";

export interface AvailableModules {
    [key: string]: Array<ModuleDescription>,
}
