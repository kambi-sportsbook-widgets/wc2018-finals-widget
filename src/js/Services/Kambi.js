import {
  offeringModule
} from 'kambi-widget-core-library'

/*
 * @property additionalBetOffersCriterionIds {Array.<number>} an array containing up to two criterion ids to be displayed in the widget
 * @property baseFilter {String} base filter to find appropriate events
 * @returns {Promise} promise of a Kambi event object containing only required betoffers
*/
const getWCEventData = (additionalBetOffersCriterionIds, baseFilter) => {
  let finalEvent

  // get all events from the world cup
  return offeringModule.getEventsByFilter(baseFilter)
    .then(events => {
      // Figure out if we have an array of events or a single one
      if (events.events) {
        // get matches only
        const games = events.events.filter(event => {
          return event.event.type === 'ET_MATCH' || event.event.state('NOT_STARTED')
        })
        // Get all betoffers of the first event on the chronological list(getEvent only returns one betoffer)
        // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-offeringModule.html#.getLiveEventsByFilter__anchor
        return offeringModule.getEvent(games[0].event.id)
      }

      throw new Error(
        'Event widget: The id provided does not correspont to a match or has no bet offers',
        events.event
      )
    })
    .then(event => {
      // Filter bet offers based on criterion ids provided in params
      let newBetOffers = []
      // Add main offer
      newBetOffers.push(event.betOffers.find(offer => offer.main))

      // Add selected bet offers
      additionalBetOffersCriterionIds.forEach(crit => {
        let result = event.betOffers.find(offer => offer.criterion.id === crit)
        if (result) newBetOffers.push(result)
      })

      event.betOffers = newBetOffers
      finalEvent = event

      return offeringModule.getEventsByFilter(baseFilter + '/all/all/competitions')
    })
    .then(tournamentEvents => {
      // Extract betting offer for Playing countries
      const countries = finalEvent.event.englishName.split('-')
        .map(item => item.trim())
      finalEvent.event.countriesEnglishNames = countries

      const competitionEvent = tournamentEvents.events.find(event => {
        return event.betOffers.length > 0?
          event.betOffers[0].criterion.id === 1004240929: // Tounament Position
          false
      })

      const tournamentBetOffer = competitionEvent.betOffers[0]
      tournamentBetOffer.outcomes = tournamentBetOffer.outcomes.filter(offer => {
        return countries.indexOf(offer.englishLabel) >= 0
      })
      // Add new bet offers to event object to pass to React
      finalEvent.betOffers.splice(1, 0, tournamentBetOffer)

      return finalEvent
    })
}

export default getWCEventData
