// Don't load svg strings into tests
jest.mock('../../../../node_modules/kambi-widget-components/src/Carousel/chevron_left.svg', () => <svg>Placeholder</svg>)
jest.mock('../../../../node_modules/kambi-widget-components/src/Carousel/chevron_right.svg', () => <svg>Placeholder</svg>)

import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import MainComponent from '../../Components/MainComponent'

let renderer
const emptyData = []
const exampleData = [
  { event: { id: 1 } },
  { event: { id: 2 } },
  { event: { id: 3 } },
]

describe('MainComponent DOM rendering', () => {

  beforeEach(() => {
    renderer = new ReactShallowRenderer()
  })

  it('fails gracefully with empty data array', () => {
    expect(
      renderer.render(
        <MainComponent
          data={emptyData}
          backgroundUrl={''}
          blendWithOperatorColor={true}
        />
      )
    )
    .toMatchSnapshot()
  })

  it('renders correctly with example data', () => {
    expect(
      renderer.render(
        <MainComponent
          data={exampleData}
          backgroundUrl={''}
          blendWithOperatorColor={true}
        />
      )
    )
    .toMatchSnapshot()
  })
})
