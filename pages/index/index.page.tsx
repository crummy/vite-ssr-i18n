import React from 'react'
import { Trans } from 'react-i18next'
import { Counter } from './Counter'

export { Page }

function Page() {
  return (
    <>
        <h1><Trans>hello</Trans></h1>
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
