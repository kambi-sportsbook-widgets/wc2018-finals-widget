/* eslint-env jest */
import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import { offeringModule } from 'kambi-widget-core-library'

import getTournamentData from '../../Services/Kambi'

const mockEvent = {
  event: {
    type: 'ET_MATCH',
    state: 'NOT_STARTED',
    betOffers: [{}],
  },
}

const mockCriterionIds = {
  topLeftBetOffer: {
    // Full time
    knockout: 1001159858,
    bronze: 1001159858,
    final: 1001159858,
  },
  topRightBetOffer: {
    // Total goals
    knockout: 1001159926,
    bronze: 1001159926,
    final: 1001159926,
  },
  bottomLeftBetOffer: {
    // Qualify / Win Bronze/ Win the Trophy
    knockout: 1001159599,
    bronze: 1002978411,
    final: 1001159600,
  },
  bottomRightBetOffer: {
    // Both teams to score
    knockout: 1001642858,
    bronze: 1001642858,
    final: 1001642858,
  },
}

const mockSuccessResponse = {
  events: [
    {
      event: {
        id: 1004378760,
        name: 'Russia - Saudi Arabia',
        englishName: 'Russia - Saudi Arabia',
        homeName: 'Russia',
        awayName: 'Saudi Arabia',
        path: [
          {
            id: 1000093190,
            name: 'Football',
            englishName: 'Football',
            termKey: 'football',
          },
          {
            id: 2000075007,
            name: 'World Cup 2018',
            englishName: 'World Cup 2018',
            termKey: 'world_cup_2018',
          },
        ],
        start: 1528988400000,
        group: 'World Cup 2018',
        type: 'ET_MATCH',
        groupId: 2000075007,
        nonLiveBoCount: 449,
        openForLiveBetting: false,
        hideStartNo: true,
        sport: 'FOOTBALL',
        state: 'NOT_STARTED',
        rank: 0,
        groupSortOrder: 5,
        displayType: 'ET_MATCH',
        prematchEnd: 1528988400000,
        hasPrematchStatistics: true,
        americanDisplayFormat: false,
        liveBetOffers: true,
        streams: [],
      },
      betOffers: [
        {
          id: 2104811968,
          closed: '2018-06-14T15:00Z',
          criterion: {
            id: 1001159858,
            label: 'Full Time',
            englishLabel: 'Full Time',
          },
          betOfferType: {
            id: 2,
            name: 'Match',
            englishName: 'Match',
          },
          eventId: 1004378760,
          cashIn: true,
          outcomes: [
            {
              id: 2373850050,
              label: '1',
              englishLabel: '1',
              odds: 1420,
              participant: 'Russia',
              type: 'OT_ONE',
              betOfferId: 2104811968,
              changedDate: '2018-06-11T12:46:09Z',
              participantId: 1000019310,
              oddsFractional: '21/50',
              oddsAmerican: '-240',
              status: 'OPEN',
            },
            {
              id: 2373850051,
              label: 'X',
              englishLabel: 'X',
              odds: 4350,
              type: 'OT_CROSS',
              betOfferId: 2104811968,
              changedDate: '2018-06-11T12:46:09Z',
              oddsFractional: '10/3',
              oddsAmerican: '335',
              status: 'OPEN',
            },
            {
              id: 2373850052,
              label: '2',
              englishLabel: '2',
              odds: 8500,
              participant: 'Saudi Arabia',
              type: 'OT_TWO',
              betOfferId: 2104811968,
              changedDate: '2018-06-11T12:46:09Z',
              participantId: 1000000247,
              oddsFractional: '15/2',
              oddsAmerican: '750',
              status: 'OPEN',
            },
          ],
          main: true,
          startingPrice: false,
          tags: [],
          sortOrder: 1,
          prematch: true,
          cashOutStatus: 'ENABLED',
        },
        {
          id: 2104814624,
          closed: '2018-06-14T15:00Z',
          criterion: {
            id: 1001159926,
            label: 'Total Goals',
            englishLabel: 'Total Goals',
          },
          betOfferType: {
            id: 6,
            name: 'Over/Under',
            englishName: 'Over/Under',
          },
          eventId: 1004378760,
          cashIn: true,
          outcomes: [
            {
              id: 2373859428,
              label: 'Over',
              englishLabel: 'Over',
              odds: 2200,
              line: 2500,
              type: 'OT_OVER',
              betOfferId: 2104814624,
              changedDate: '2018-06-11T12:46:08Z',
              oddsFractional: '6/5',
              oddsAmerican: '120',
              status: 'OPEN',
            },
            {
              id: 2373859429,
              label: 'Under',
              englishLabel: 'Under',
              odds: 1700,
              line: 2500,
              type: 'OT_UNDER',
              betOfferId: 2104814624,
              changedDate: '2018-06-11T12:46:08Z',
              oddsFractional: '7/10',
              oddsAmerican: '-143',
              status: 'OPEN',
            },
          ],
          startingPrice: false,
          tags: [],
          sortOrder: 2,
          prematch: true,
          cashOutStatus: 'ENABLED',
        },
      ],
    },
    {
      event: {
        id: 1004378743,
        name: 'Egypt - Uruguay',
        englishName: 'Egypt - Uruguay',
        homeName: 'Egypt',
        awayName: 'Uruguay',
        path: [
          {
            id: 1000093190,
            name: 'Football',
            englishName: 'Football',
            termKey: 'football',
          },
          {
            id: 2000075007,
            name: 'World Cup 2018',
            englishName: 'World Cup 2018',
            termKey: 'world_cup_2018',
          },
        ],
        start: 1529064000000,
        group: 'World Cup 2018',
        type: 'ET_MATCH',
        groupId: 2000075007,
        nonLiveBoCount: 452,
        openForLiveBetting: false,
        hideStartNo: true,
        sport: 'FOOTBALL',
        state: 'NOT_STARTED',
        rank: 0,
        groupSortOrder: 5,
        displayType: 'ET_MATCH',
        prematchEnd: 1529064000000,
        hasPrematchStatistics: true,
        americanDisplayFormat: false,
        liveBetOffers: true,
        streams: [],
      },
      betOffers: [
        {
          id: 2104810360,
          closed: '2018-06-15T12:00Z',
          criterion: {
            id: 1001159858,
            label: 'Full Time',
            englishLabel: 'Full Time',
          },
          betOfferType: {
            id: 2,
            name: 'Match',
            englishName: 'Match',
          },
          eventId: 1004378743,
          cashIn: true,
          outcomes: [
            {
              id: 2373848857,
              label: '1',
              englishLabel: '1',
              odds: 6750,
              participant: 'Egypt',
              type: 'OT_ONE',
              betOfferId: 2104810360,
              changedDate: '2018-06-11T12:46:57Z',
              participantId: 1000000256,
              oddsFractional: '23/4',
              oddsAmerican: '575',
              status: 'OPEN',
            },
            {
              id: 2373848858,
              label: 'X',
              englishLabel: 'X',
              odds: 3650,
              type: 'OT_CROSS',
              betOfferId: 2104810360,
              changedDate: '2018-06-11T12:46:57Z',
              oddsFractional: '13/5',
              oddsAmerican: '265',
              status: 'OPEN',
            },
            {
              id: 2373848859,
              label: '2',
              englishLabel: '2',
              odds: 1580,
              participant: 'Uruguay',
              type: 'OT_TWO',
              betOfferId: 2104810360,
              changedDate: '2018-06-11T12:46:57Z',
              participantId: 1000000155,
              oddsFractional: '4/7',
              oddsAmerican: '-175',
              status: 'OPEN',
            },
          ],
          main: true,
          startingPrice: false,
          tags: [],
          sortOrder: 1,
          prematch: true,
          cashOutStatus: 'ENABLED',
        },
        {
          id: 2104814763,
          closed: '2018-06-15T12:00Z',
          criterion: {
            id: 1001159926,
            label: 'Total Goals',
            englishLabel: 'Total Goals',
          },
          betOfferType: {
            id: 6,
            name: 'Over/Under',
            englishName: 'Over/Under',
          },
          eventId: 1004378743,
          cashIn: true,
          outcomes: [
            {
              id: 2373863258,
              label: 'Over',
              englishLabel: 'Over',
              odds: 2500,
              line: 2500,
              type: 'OT_OVER',
              betOfferId: 2104814763,
              changedDate: '2018-06-11T12:46:59Z',
              oddsFractional: '6/4',
              oddsAmerican: '150',
              status: 'OPEN',
            },
            {
              id: 2373863259,
              label: 'Under',
              englishLabel: 'Under',
              odds: 1550,
              line: 2500,
              type: 'OT_UNDER',
              betOfferId: 2104814763,
              changedDate: '2018-06-11T12:46:59Z',
              oddsFractional: '11/20',
              oddsAmerican: '-182',
              status: 'OPEN',
            },
          ],
          startingPrice: false,
          tags: [],
          sortOrder: 2,
          prematch: true,
          cashOutStatus: 'ENABLED',
        },
      ],
    },
  ],
}

// Date span for World Cup 2018
const mockTournamentDates = {
  knockout: {
    start: '2018-03-30T00:00', ////// THIS DATE IS SET TOO EARLY FOR PRE FINAL TESTING PURPOSES
    end: '2018-07-11T23:59',
  },
  bronze: {
    start: '2018-07-12T00:00',
    end: '2018-07-14T23:59',
  },
  final: {
    start: '2018-07-12T00:00',
    end: '2018-07-15T23:59',
  },
}

const mockWrongDates = {
  knockout: {
    start: '2012-03-30T00:00', ////// THIS DATE IS SET TOO EARLY FOR PRE FINAL TESTING PURPOSES
    end: '2012-07-11T23:59',
  },
  bronze: {
    start: '2012-07-12T00:00',
    end: '2012-07-14T23:59',
  },
  final: {
    start: '2012-07-12T00:00',
    end: '2012-07-15T23:59',
  },
}

configure({ adapter: new Adapter() })
let renderer

jest.mock('kambi-widget-core-library', () => ({
  offeringModule: {
    getEventsByFilter: jest.fn(),
  },
}))

describe('Kambi data fetching', () => {
  beforeEach(() => {
    offeringModule.getEventsByFilter = jest.fn()
  })

  it('can fetch data using promises', () => {
    offeringModule.getEventsByFilter.mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve({
          events: [mockSuccessResponse],
        })
      })
    })

    getTournamentData('/mockFilter', mockCriterionIds, mockTournamentDates)
      .then(res => {
        expect(res).toMatchSnapshot()
        expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1)
        expect(offeringModule.getEventsByFilter).toHaveBeenCalledWith(
          '/mockFilter'
        )
      })
      .catch(err => {
        throw new Error('Not supposed to reach this code!')
      })
  })

  it('can handle errors when fetching data', () => {
    offeringModule.getEventsByFilter.mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve(null)
      })
    })

    getTournamentData(
      '/mockFilter',
      mockCriterionIds,
      mockTournamentDates
    ).catch(err => {
      expect(err.message).toEqual(
        'No tournament data available for supplied filters: /mockFilter, /mockFilter/all/all/competitions'
      )
      expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1)
      expect(offeringModule.getEventsByFilter).toHaveBeenCalledWith(
        '/mockFilter'
      )
    })
  })

  it('throws an error if no events fell within the specified date range', () => {
    offeringModule.getEventsByFilter.mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve(mockSuccessResponse)
      })
    })

    getTournamentData('/mockFilter', mockCriterionIds, mockWrongDates).catch(
      err => {
        expect(err.message).toEqual(
          'No events were found within the provided date ranges'
        )
        expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1)
        expect(offeringModule.getEventsByFilter).toHaveBeenCalledWith(
          '/mockFilter'
        )
      }
    )
  })
})
