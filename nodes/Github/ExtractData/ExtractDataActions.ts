const regexProjectUrl = /^https:\/\/api.github.com\/projects\/(\d+)$/
const regexColumnUrl = /^https:\/\/api.github.com\/projects\/columns\/(\d+)$/
const regexContentUrl = /^https:\/\/api.github.com\/repos\/([\w-.]+)\/([\w-.]+)\/issues\/(\d+)$/

function getRegexMatch(regExp: RegExp, item: string): RegExpExecArray | null {
  if (item && regExp.test(item)) {
    return regExp.exec(item);
  }
  return null;
}

export function getRegexMatchOfProjectUrl(url: string): RegExpExecArray | null {
  return getRegexMatch(regexProjectUrl, url);
}

export function getRegexMatchOfColumnUrl(url: string): RegExpExecArray | null {
  return getRegexMatch(regexColumnUrl, url);
}

export function getRegexMatchOfContentUrl(url: string): RegExpExecArray | null {
  return getRegexMatch(regexContentUrl, url);
}