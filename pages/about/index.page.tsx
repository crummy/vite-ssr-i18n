import React from 'react'
import './code.css'
import {useTranslation} from "react-i18next";

export { Page }

function Page() {
  const { t } = useTranslation('about');

  return (
    <>
      <h1>{t('about')}</h1>
      <p>
        Example of using <code>vite-plugin-ssr</code> with <code>react-i18next</code> to provide SSR-friendly translations.
      </p>
    </>
  )
}
