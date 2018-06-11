import React from 'react'
import { translationModule } from 'kambi-widget-core-library'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Participants from '../../Components/Participants'

let renderer

const exampleEvent = {
  countriesEnglishNames: ['Country1', 'Country2'],
  homeName: 'Country1',
  awayName: 'Country2',
  englishName: 'Country1 - Country2',
  id: 1,
  start: 1528988400000,
  state: 'NOT_STARTED',
  type: 'ET_MATCH',
}

jest.mock('kambi-widget-core-library', () => ({
  translationModule: {
    getTranslation: jest.fn(key => `Translated ${key}`),
  },
}))

describe('Participants DOM rendering', () => {
  beforeEach(() => {
    renderer = new ReactShallowRenderer()
    translationModule.getTranslation = jest.fn(key => `Translated ${key}`)
  })

  it('renders correctly with an example event', () => {
    expect(
      renderer.render(<Participants event={exampleEvent} onClick={() => {}} />)
    ).toMatchSnapshot()
  })
})
