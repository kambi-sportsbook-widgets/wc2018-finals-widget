import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import EventWidget from '../../Components/EventWidget'

let renderer;

const emptyEvent = {
  betOffers: [],
  event: {},
}

const exampleEvent = {
  "betOffers": [ {}, {}, {}, {} ],
  "event": {
    "countriesEnglishNames": [
      "Country1",
      "Country2",
    ],
    "englishName": "Country1 - Country2",
    "id": 1,
    "start": 1528988400000,
    "state": "NOT_STARTED",
    "type": "ET_MATCH",
  },
}

describe('Event DOM rendering', () => {

  beforeEach(() => {
    renderer = new ReactShallowRenderer()
  })

  it('renders correctly with default props', () => {
    expect(
      renderer.render(
        <EventWidget
          event={emptyEvent}
          flagBaseUrl={null}
          iconUrl={null}
        />
      )
    )
    .toMatchSnapshot()
  })

  it('renders correctly with an example event', () => {
    expect(
      renderer.render(
        <EventWidget
          event={exampleEvent}
          flagBaseUrl={null}
          iconUrl={null}
        />
      )
    )
    .toMatchSnapshot()
  })
})
