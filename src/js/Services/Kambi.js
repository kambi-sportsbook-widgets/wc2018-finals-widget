import { offeringModule } from 'kambi-widget-core-library'

const getTournamentData = (filter, criterionIds, dateRanges) => {
  let finalType

  return offeringModule
    .getEventsByFilter(filter)
    .then(tournamentData => {
      if (tournamentData == null) {
        throw new Error(
          `No tournament data available for supplied filters: ${filter}, ${filter}/all/all/competitions`
        )
      }

      const tournamentEvents = tournamentData.events

      // filter events by date range
      const now = new Date()
      finalType =
        now < new Date(dateRanges.knockout.end)
          ? 'knockout'
          : now < new Date(dateRanges.bronze.end)
            ? 'bronze'
            : now < new Date(dateRanges.final.end)
              ? 'final'
              : null

      // return in case today's date is after all provided date ranges
      if (finalType === null) {
        throw new Error(`No events were found within the provided date ranges`)
        return
      }

      // filter tournamentEvents by dateRange of finalType
      const filteredEvents = tournamentEvents.filter(event => {
        const eventStartTime = new Date(event.event.start)
        const finalStartTime = new Date(dateRanges[finalType].start)
        const finalEndTime = new Date(dateRanges[finalType].end)
        const eventNotStarted =
          event.event.type === 'ET_MATCH' && event.event.state === 'NOT_STARTED'
        const eventHasBetOffers = event.betOffers.length > 0

        return (
          eventStartTime > finalStartTime &&
          eventStartTime < finalEndTime &&
          eventNotStarted &&
          eventHasBetOffers
        )
      })

      // return if no events match the date and status filters
      if (filteredEvents.length < 1) {
        throw new Error(
          `No events were found for the ${finalType} dates or matched the status filters`
        )
        return
      }

      // set fulltime (topLeft) and goalline (topRight) betOffers
      const eventsWithInitialOffers = filteredEvents.filter(event => {
        event.betOffers.forEach(betOffer => {
          if (
            betOffer.criterion.id === criterionIds.topLeftBetOffer[finalType]
          ) {
            event.topLeftBetOffer = betOffer
          } else if (
            betOffer.criterion.id === criterionIds.topRightBetOffer[finalType]
          ) {
            event.topRightBetOffer = betOffer
          }
        })
        if (!event.topLeftBetOffer || !event.topRightBetOffer) {
          console.error('could not find matching betoffers for event:', event)
        }
        return event.topLeftBetOffer && event.topRightBetOffer
      })

      return Promise.all([
        Promise.resolve(eventsWithInitialOffers),
        ...eventsWithInitialOffers.map(event =>
          offeringModule.getEvent(event.event.id)
        ),
      ])
    })
    .then(([eventsWithInitialOffers, ...finalEvents]) => {
      // return in case we didn't find any events with the provided filter
      if (finalEvents.length < 1) {
        throw new Error(
          `No events were found for supplied filters: ${filter}, ${filter}/all/all/competitions`
        )
        return
      }

      // go through each final event and find remaining betOffers from supplied criterion ids
      // append these to the eventsWithInitialOffers based on idx position
      const eventsWithAllBetOffers = eventsWithInitialOffers.filter(
        (event, idx) => {
          const {
            topLeftBetOffer,
            topRightBetOffer,
            bottomLeftBetOffer,
            bottomRightBetOffer,
          } = criterionIds

          // get bottomLeft (qualification) betoffer from event
          // get bottomRight (Both teams to score) betoffer from event
          finalEvents[idx].betOffers.forEach(betOffer => {
            if (
              betOffer.criterion.id ===
              criterionIds.bottomLeftBetOffer[finalType]
            ) {
              event.bottomLeftBetOffer = betOffer
            } else if (
              betOffer.criterion.id ===
              criterionIds.bottomRightBetOffer[finalType]
            ) {
              event.bottomRightBetOffer = betOffer
            }
          })

          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ////  NOTE THIS IS COMMMENTED OUT SO THAT OPERATORS CAN TEST THE WIDGET BEFORE THE FINAL EVENTS AND QUALIFICATION BETOFFERS ARE AVAILABLE FROM KAMBI
          ///   INSTEAD WE HAVE THE bottomLeftBetOffer NON MANDATORY
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // // return if any of the offers are missing
          // if (!event.bottomLeftBetOffer || !event.bottomRightBetOffer) {
          //   throw new Error(
          //     'Could not find a matching betOffer from supplied criterionID'
          //   )
          //   return
          // }

          // return if any of the offers are missing
          if (!event.bottomRightBetOffer) {
            console.error('could not find betoffers for event:', event)
          }

          // if all betOffers found return event with appended offers
          return event.bottomRightBetOffer
        }
      )

      const now = new Date()
      // Sort by starting date
      const eventsByStart = eventsWithAllBetOffers.sort((a, b) => {
        if (now >= new Date('2018-07-12T00:00')) {
          return new Date(b.event.start) - new Date(a.event.start)
        } else {
          return new Date(a.event.start) - new Date(b.event.start)
        }
      })

      return Promise.resolve(eventsByStart)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export default getTournamentData
