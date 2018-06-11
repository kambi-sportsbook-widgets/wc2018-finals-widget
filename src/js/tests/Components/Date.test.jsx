import React from 'react'
import { translationModule } from 'kambi-widget-core-library'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import DateComponent from '../../Components/Date'

let renderer

const exampleDate = 1528988400000

jest.mock('kambi-widget-core-library', () => ({
  translationModule: {
    getTranslation: jest.fn(key => `Translated ${key}`),
  },
}))

describe('Date DOM rendering', () => {
  beforeEach(() => {
    renderer = new ReactShallowRenderer()
    translationModule.getTranslation = jest.fn(key => `Translated ${key}`)
  })

  it('renders correctly with example props', () => {
    expect(
      renderer.render(<DateComponent date={exampleDate} />)
    ).toMatchSnapshot()
  })
})
