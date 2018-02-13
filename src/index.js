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

// default criterion ids - right now these are just random will be substitued on what we'll agree
const defaultCriterionIds = [2104811968, 2104814598, 2104814607, 2104814684]
const MAX_CRITERION_IDS = 4;

// Initialize kambi's api
// http://kambi-sportsbook-widgets.github.io/widget-core-library/module-coreLibrary.html#.init__anchor
coreLibrary
  .init({
    title: 'World Cup 2018 Finals',
    betOffersCriterionIds: [], // array with up to 4 numbers, find out the criterionIds of the mock betoffers to use as default
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
      // Here we should figure out which events we want to display
      // for now we just grab the first one

      // Get the event with all its betoffers (getEbent only returns one betoffer)
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
    let criterionIds = [...coreLibrary.args.betOffersCriterionIds]
    let i = -1
    while (criterionIds.length < MAX_CRITERION_IDS && i < defaultCriterionIds.length) {
      i++
      if (criterionIds.indexOf(defaultCriterionIds[i]) >= 0) { continue }
      criterionIds.push(defaultCriterionIds[i])
    }

    event.betOffers = event.betOffers.filter((item) => {
      return criterionIds.indexOf(item.id) >= 0
    })
    // Renders the widget
    ReactDOM.render(
      React.createElement(EventWidget, {
        event: event,
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
