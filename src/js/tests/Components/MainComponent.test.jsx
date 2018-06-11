import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import MainComponent from '../../Components/MainComponent'

let renderer
const emptyData = []
const exampleData = [
  { event: { id: 1, betOffers: [] } },
  { event: { id: 2, betOffers: [] } },
  { event: { id: 3, betOffers: [] } },
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
    ).toMatchSnapshot()
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
    ).toMatchSnapshot()
  })
})
