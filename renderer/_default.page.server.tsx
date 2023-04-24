import {I18nextProvider} from "react-i18next";
import {renderToString, renderToPipeableStream} from 'react-dom/server'

export {render}
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'locale', 'urlOriginal']

import React, {Suspense} from 'react'
import {PageShell} from './PageShell'
import {escapeInject, dangerouslySkipEscape, stampPipe} from 'vite-plugin-ssr/server'
import logoUrl from './logo.svg'
import type {PageContextServer} from './types'
import {i18n, initLocale} from "./i18n";

async function render(pageContext: PageContextServer & { locale: 'en' | 'zh', withStream: boolean }) {
    const {Page, pageProps, locale} = pageContext
    await initLocale(locale)
    const page = <PageShell pageContext={pageContext}>
        <Suspense fallback={<div>Loading...</div>}>
            <I18nextProvider i18n={i18n}>
                <Page {...pageProps} />
            </I18nextProvider>
        </Suspense>
    </PageShell>


    // See https://vite-plugin-ssr.com/head
    const {documentProps} = pageContext.exports
    const title = (documentProps && documentProps.title) || 'Vite SSR app'
    const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

    let pageHtml: any
    if (!pageContext.withStream) {
        console.log("renderToString")
        pageHtml = dangerouslySkipEscape(renderToString(page))
    } else {
        //const stream = await renderToStream(page, { disable: true })
        const {pipe} = renderToPipeableStream(page, {
            onShellReady() {
                console.log('onShellReady()')
            },
            onAllReady() {
                console.log('onAllReady()')
            },
            onShellError(err: unknown) {
                console.log('onShellError()')
                console.log(err)
            },
            onError(err: unknown) {
                console.log('onError()')
                console.log(err)
            }
        })
        stampPipe(pipe, 'node-stream')
        pageHtml = pipe
    }

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        }
    }
}
