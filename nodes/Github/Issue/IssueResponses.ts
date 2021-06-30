interface IIssueOperationBaseResponse {
  "resource": string;
  "operation": string;
  "response": object;
}

export interface IIssueOperationAddLabelsResponse extends IIssueOperationBaseResponse {
  "add-labels": string;
}

export interface IIssueOperationUpdateLabelsResponse extends IIssueOperationAddLabelsResponse {
  "remove-labels": string;
}

export interface IIssueOperationRemoveLabelResponse extends IIssueOperationBaseResponse {
  "remove-label": string;
}

export type IIssueOperationResponse = IIssueOperationUpdateLabelsResponse | IIssueOperationAddLabelsResponse | IIssueOperationRemoveLabelResponse;