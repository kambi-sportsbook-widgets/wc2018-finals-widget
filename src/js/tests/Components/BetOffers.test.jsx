// Don't load svg strings into tests
jest.mock('../../../../node_modules/kambi-widget-components/src/Carousel/chevron_left.svg', () => <svg>Placeholder</svg>)
jest.mock('../../../../node_modules/kambi-widget-components/src/Carousel/chevron_right.svg', () => <svg>Placeholder</svg>)

import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import BetOffers from '../../Components/BetOffers'

let renderer;

const mockEvent = {}

const emptyBetOffers = []

const exampleBetOffers = [
  {
    main: true,
    id: 1,
    criterion: { label: 'Some label 1' },
    outcomes: [ { id: 1 }, { id: 2 }, { id: 3 } ]
  },
  {
    id: 2,
    criterion: { label: 'Some label 2' },
    outcomes: [ { id: 4 }, { id: 5 }, { id: 6 } ]
  },
  {
    id: 3,
    criterion: { label: 'Some label 3' },
    outcomes: [ { id: 7 }, { id: 8 }, { id: 9 } ]
  },
]

describe('BetOffers DOM rendering', () => {

  beforeEach(() => {
    renderer = new ReactShallowRenderer()
  })

  it('renders correctly with empty props', () => {
    expect(
      renderer.render(
        <BetOffers
        betOffers={emptyBetOffers}
        event={mockEvent}
        />
      )
    )
    .toMatchSnapshot()
  })

  it('renders correctly with example props', () => {
    expect(
      renderer.render(
        <BetOffers
          betOffers={exampleBetOffers}
          event={mockEvent}
        />
      )
    )
    .toMatchSnapshot()
  })
})
