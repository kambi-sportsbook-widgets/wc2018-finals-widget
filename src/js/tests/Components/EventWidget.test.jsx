import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import EventWidget from '../../Components/EventWidget'

import { coreLibrary, translationModule } from 'kambi-widget-core-library'

let renderer

const emptyEvent = {
  betOffers: [],
  event: {},
}

const exampleEvent = {
  betOffers: [{}, {}, {}, {}],
  event: {
    countriesEnglishNames: ['Country1', 'Country2'],
    englishName: 'Country1 - Country2',
    id: 1,
    start: 1528988400000,
    state: 'NOT_STARTED',
    type: 'ET_MATCH',
  },
}

jest.mock('kambi-widget-core-library', () => ({
  coreLibrary: {
    rootElement: <div style={{ width: '500px' }} />,
  },
  translationModule: {
    getTranslation: jest.fn(key => `Translated ${key}`),
  },
}))

describe('Event DOM rendering', () => {
  beforeEach(() => {
    renderer = new ReactShallowRenderer()
    translationModule.getTranslation = jest.fn(key => `Translated ${key}`)
    coreLibrary.rootElement = <div style={{ width: '500px' }} />
  })

  it('renders correctly with default props', () => {
    expect(
      renderer.render(
        <EventWidget event={emptyEvent} flagBaseUrl={null} iconUrl={null} />
      )
    ).toMatchSnapshot()
  })

  it('renders correctly with an example event', () => {
    expect(
      renderer.render(
        <EventWidget event={exampleEvent} flagBaseUrl={null} iconUrl={null} />
      )
    ).toMatchSnapshot()
  })
})
