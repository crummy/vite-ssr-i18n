import React from 'react'
import {useTranslation} from 'react-i18next'
import { Counter } from './Counter'

export { Page }

function Page() {
    const { t } = useTranslation();

    return (
    <>
      <h1>{t('hello')}</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}
