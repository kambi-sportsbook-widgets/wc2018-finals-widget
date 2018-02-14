import React from 'react'
import ReactDOM from 'react-dom'
import {
  coreLibrary,
  widgetModule,
  offeringModule,
} from 'kambi-widget-core-library'
import EventWidget from './js/Components/EventWidget'
import './scss/app.scss'
import './index.html'

let finalEvent
// Initialize kambi's api
// http://kambi-sportsbook-widgets.github.io/widget-core-library/module-coreLibrary.html#.init__anchor
coreLibrary
  .init({
    title: 'World Cup 2018 Finals',
    widgetTrackingName: 'wc2018-finals',
    additionalBetOffersCriterionIds: [
      1001159926, // Total goals
      1001642858  // both teams to score
    ], // array with up to 2 numbers, find out the criterionIds of the mock betoffers to use as default
    flagBaseUrl: "", // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    backgroundUrl: "", // string with the image to use as background-image
    iconUrl: "" // string with the icon URL, should have a default if absent
  })
  .then(() => {
    // get all events from the world cup
    return offeringModule.getEventsByFilter('/football/world_cup_2018')
  })
  .then(events => {
    // Figure out if we have an array of events or a single one
    if (events.events) {
      // get matches only
      const games = events.events.filter(event => {
        return event.event.type === 'ET_MATCH'
      })
      // Get all betoffers of the first event on the chronological list(getEvent only returns one betoffer)
      // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-offeringModule.html#.getLiveEventsByFilter__anchor
      return offeringModule.getEvent(games[0].event.id)
    }
    // Check that the event type is 'ET_MATCH' and has betoffers
    if (events.event.type === 'ET_MATCH' && events.event.betoffers.length) {
      return events
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
    const criterionIds = coreLibrary.args.additionalBetOffersCriterionIds
    criterionIds.forEach(crit => {
      let result = event.betOffers.find(offer => offer.criterion.id === crit)
      if (result) newBetOffers.push(result)
    })

    event.betOffers = newBetOffers
    finalEvent = event

    return offeringModule.getEventsByFilter('/football/world_cup_2018/all/all/competitions')
  })
  .then(tournamentEvents => {
    // Extract betting offer for Playing countries
    const countries = finalEvent.event.englishName.split('-')
      .map(item => item.trim())
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

    // Renders the widget
    ReactDOM.render(
      React.createElement(EventWidget, {
        event: finalEvent,
        title: coreLibrary.args.title,
      }),
      document.getElementById('root')
    )
  })
  .catch(error => {
    widgetModule.removeWidget()
    console.debug('event widget:', error)
    throw error
  })
