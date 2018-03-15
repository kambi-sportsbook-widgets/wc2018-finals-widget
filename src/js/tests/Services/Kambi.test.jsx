import getWCEventData from '../../Services/Kambi'
import { offeringModule } from 'kambi-widget-core-library'

jest.mock('kambi-widget-core-library', () => ({
   offeringModule: {
      getEventsByFilter: jest.fn(),
      getEvent: jest.fn()
   }
}))

describe('Kambi service finals events', () => {

  beforeEach(() => {
    offeringModule.getEventsByFilter = jest.fn()
    offeringModule.getEvent = jest.fn()

    offeringModule.getEventsByFilter.mockReturnValueOnce(new Promise(resolve => resolve({events: [
      {
        event: {
          type: 'ET_MATCH',
          start: 1528988400000, // 2018-06-14
          id: 1,
          state: 'NOT_STARTED'
        }
      }
    ]})))

    offeringModule.getEvent.mockReturnValueOnce(new Promise(resolve => resolve({
      event: {
        "id": 1,
        "start": 1528988400000,
        "type": "ET_MATCH",
        "englishName": "Country1 - Country2",
        "state": "NOT_STARTED",
      },
      betOffers: [
        {
          main: true,
          criterion: { id: 5 },
        },
        { criterion: { id: 1 } },
        { criterion: { id: 2 } },
        { criterion: { id: 3 } },
      ]
    })))

    offeringModule.getEventsByFilter.mockReturnValueOnce(new Promise(resolve => resolve({events: [
      {
        event: {
          type: 'ET_COMPETITION',
          id: 23,
        },
        betOffers: [
          { criterion: { id: 12 } },
          { criterion: { id: 12 } },
        ]
      },
      {
        event: {
          type: 'ET_COMPETITION',
          id: 24,
        },
        betOffers: [
          { criterion: { id: 11 } },
          { criterion: { id: 11 } },
        ]
      },
      {
        event: {
          type: 'ET_COMPETITION',
          id: 25,
        },
        betOffers: [
          { criterion: { id: 10 } },
          { criterion: { id: 10 } },
        ]
      },
    ]})))

    offeringModule.getEvent.mockReturnValueOnce(new Promise(resolve => resolve({
      event: {},
      betOffers: [
        { to: 1, outcomes: [
          { englishLabel: 'Country1', odds: 2000 },
          { englishLabel: 'Country2', odds: 2000 },
          { englishLabel: 'Country3', odds: 3000 },
          { englishLabel: 'Country4', odds: 3000 },
        ]},
        { to: 2, outcomes: [
          { englishLabel: 'Country1', odds: 1000 },
          { englishLabel: 'Country2', odds: 1000 },
          { englishLabel: 'Country3', odds: 1000 },
          { englishLabel: 'Country4', odds: 1000 },
        ]},
      ]
    })))
  })

  it('returns events correctly', () => {

    // Service args
    const additionalBetOffersCriterionIds = [ 1, 2 ]
    const data = {
      baseFilter:'test/filter/1',
      qualifyCriterionId: [ 11 ],
      finalCriterionId: [ 10, 11 ]
    }
    const dates ={
      quarterFinals: {
        start: new Date('2018-06-14 00:00 UTC+3'),
        end: new Date('2018-06-14 23:59 UTC+3')
      },
      semiFinals: {
        start: new Date('2018-07-10 00:00 UTC+3'),
        end: new Date('2018-07-11 23:59 UTC+3')
      },
      finals: {
        start: new Date('2018-07-14 00:00 UTC+3')
      }
    }

    expect(offeringModule.getEventsByFilter).not.toHaveBeenCalled()
    expect(offeringModule.getEvent).not.toHaveBeenCalled()

    return getWCEventData(additionalBetOffersCriterionIds, data, dates)
       .then((events) => {
          expect(events).toMatchSnapshot()
          expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(2)
          expect(offeringModule.getEventsByFilter).toHaveBeenLastCalledWith('test/filter/1/all/all/competitions')
          expect(offeringModule.getEvent).toHaveBeenCalledTimes(2)
          expect(offeringModule.getEvent).toHaveBeenLastCalledWith(24)
       })
   })

   it('Throws an error when no events within dates', () => {

     // Service args
     const additionalBetOffersCriterionIds = [ 1, 2 ]
     const data = {
       baseFilter:'test/filter/1',
       qualifyCriterionId: [ 11 ],
       finalCriterionId: [ 10, 11 ]
     }
     const dates ={
       quarterFinals: {
         start: new Date('2018-06-17 00:00 UTC+3'),
         end: new Date('2018-06-17 23:59 UTC+3')
       },
       semiFinals: {
         start: new Date('2018-07-10 00:00 UTC+3'),
         end: new Date('2018-07-11 23:59 UTC+3')
       },
       finals: {
         start: new Date('2018-07-14 00:00 UTC+3')
       }
     }
      expect(offeringModule.getEventsByFilter).not.toHaveBeenCalled()
      expect(offeringModule.getEvent).not.toHaveBeenCalled()

      return getWCEventData(additionalBetOffersCriterionIds, data, dates)
         .then((events) => {
            throw new Error('Not supposed to reach here')
         })
         .catch((err) => {
            expect(err.message === `No events available for supplied filter: ${data.baseFilter}`)
            expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(2)
            expect(offeringModule.getEventsByFilter).toHaveBeenLastCalledWith('test/filter/1/all/all/competitions')
            expect(offeringModule.getEvent).not.toHaveBeenCalled()
         })
   })

})
