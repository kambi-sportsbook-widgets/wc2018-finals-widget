import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import DateComponent from '../../Components/Date'

let renderer;

const exampleDate = 1528988400000

describe('Date DOM rendering', () => {

  beforeEach(() => {
    renderer = new ReactShallowRenderer()
  })

  it('renders correctly with example props', () => {
    expect(
      renderer.render(
        <DateComponent
          date={exampleDate}
        />
      )
    )
    .toMatchSnapshot()
  })
})
