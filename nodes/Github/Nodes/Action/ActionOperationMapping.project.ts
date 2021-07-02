import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { ProjectType } from "../../Common/Enums";
import { ActionProjectOperation } from "./ActionEnums";
import { operationActionProjectMoveCard } from "./ActionOperations.project";
import { IActionProjectResponse } from "./ActionResponses.project";

export interface IActionProjectOperationMapping {
  [key: string]: (
    this: IHookFunctions | IExecuteFunctions,
    credentials: ICredentialDataDecryptedObject,
    projectType: ProjectType,
    projectName: string,
    itemIndex?: number
  ) => Promise<IActionProjectResponse>;
}

export const ActionProjectOperationMapping: IActionProjectOperationMapping = {
  [ActionProjectOperation.MoveCard]: operationActionProjectMoveCard
}
