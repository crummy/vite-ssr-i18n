// see https://vite-plugin-ssr.com/i18n

export function onBeforeRoute(pageContext: { urlOriginal: string }) {
    const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal)
    return {
        pageContext: {
            // We make `locale` available as `pageContext.locale`
            locale,
            // We overwrite `pageContext.urlOriginal`
            urlOriginal: urlWithoutLocale
        }
    }
}

export function extractLocale(url: string): { locale: "en" | "zh", urlWithoutLocale: string } {
    const locale = url.startsWith('/zh') ? 'zh' : 'en'

    const urlWithoutLocale = url.startsWith(`/${locale}/`) ? url.slice(locale.length + 1) : url

    return { locale, urlWithoutLocale }
}

export const locales = ['en', 'zh']

export const localeDefault = 'en'
