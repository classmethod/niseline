// Reason for avoid "typeof liff.isInClient"
// https://github.com/microsoft/TypeScript/issues/42873
export const buildIsInClient =
  (isInClient: boolean): (() => boolean) =>
  () =>
    isInClient
