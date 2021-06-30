import {
  IExtractFromUriColumnResponse,
  IExtractFromUriContentResponse,
  IExtractFromUriProjectResponse
} from './ExtractFromUriResponses';

const regexProjectUrl = /^https:\/\/api.github.com\/projects\/\(d+)$/
const regexColumnUrl = /^https:\/\/api.github.com\/projects\/columns\/(\d+)$/
const regexContentUrl = /^https:\/\/api.github.com\/repos\/([\w-.]+)\/([\w-.]+)\/issues\/(\d+)$/

export function operationFromProjectUrl(
  url: string
): IExtractFromUriProjectResponse {
  if (url && regexProjectUrl.test(url)) {
    const regexResult = regexProjectUrl.exec(url);

    if (regexResult) {
      return {
        "projectId": parseInt(regexResult[1])
      }
    }
  }

  return {
    "projectId": -1,
    "error": "URL does not match the attended pattern."
  }
}

export function operationFromColumnUrl(
  url: string
): IExtractFromUriColumnResponse {
  if (url && regexColumnUrl.test(url)) {
    const regexResult = regexColumnUrl.exec(url);

    if (regexResult) {
      return {
        "columnId": parseInt(regexResult[1])
      }
    }
  }

  return {
    "columnId": -1,
    "error": "URL does not match the attended pattern."
  }
}

export function operationFromContentUrl(
  url: string
): IExtractFromUriContentResponse {
  if (url && regexContentUrl.test(url)) {
    const regexResult = regexContentUrl.exec(url);

    if (regexResult) {
      return {
        "owner": regexResult[1],
        "repository": regexResult[2],
        "contentId": parseInt(regexResult[3])
      }
    }
  }

  return {
    "owner": "",
    "repository": "",
    "contentId": -1,
    "error": "URL does not match the attended pattern."
  }
}
