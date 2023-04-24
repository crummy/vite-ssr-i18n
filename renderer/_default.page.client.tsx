import {i18n, initLocale} from "./i18n";

import * as React from 'react'
import {hydrateRoot} from 'react-dom/client'
import {PageShell} from './PageShell'
import {I18nextProvider} from "react-i18next";
import {Suspense} from "react";

export async function render(pageContext: any) {
    const {Page, pageProps, locale} = pageContext
    await initLocale(locale)
    hydrateRoot(
        document.getElementById('page-view')!,
        <PageShell pageContext={pageContext}>
            <Suspense fallback={<div>Loading...</div>}>
                <I18nextProvider i18n={i18n}>
                    <Page {...pageProps} />
                </I18nextProvider>
            </Suspense>
        </PageShell>
    )
}
