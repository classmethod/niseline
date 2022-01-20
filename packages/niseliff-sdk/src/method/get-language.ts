import liff from '@line/liff'

export const buildGetLanguage =
  (language: string): typeof liff.getLanguage =>
  () =>
    language
