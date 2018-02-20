import React from 'react'
import ReactDOM from 'react-dom'
import {
  coreLibrary,
  widgetModule,
} from 'kambi-widget-core-library'
import EventWidget from './js/Components/EventWidget'

import getWCEventData from './js/Services/Kambi'

import './scss/app.scss'
import './index.html'

// Initialize kambi's api
// http://kambi-sportsbook-widgets.github.io/widget-core-library/module-coreLibrary.html#.init__anchor
coreLibrary
  .init({
    widgetTrackingName: 'wc2018-finals',
    additionalBetOffersCriterionIds: [
      1001159926, // Total goals
      1001642858  // both teams to score
    ], // array with up to 2 numbers, find out the criterionIds of the mock betoffers to use as default
    // flagBaseUrl: "", // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    // iconUrl: "" // string with the icon URL, should have a default if absent
    backgroundUrl: 'assets/overview-bw-bg-desktop.jpg', // string with the image to use as background-image
    blendWithOperatorColor: true, // determines if background should be blended with operator color. (Normally not wanted if providing own background image)
  })
  .then(() => {
    return getWCEventData(coreLibrary.args.additionalBetOffersCriterionIds, '/football/world_cup_2018')
    // return getWCEventData(coreLibrary.args.additionalBetOffersCriterionIds, '/football/champions_league')
  })
  .then(event => {

    // Renders the widget
    ReactDOM.render(
      React.createElement(EventWidget, {
        event: event,
        backgroundUrl: coreLibrary.args.backgroundUrl,
        blendWithOperatorColor: coreLibrary.args.blendWithOperatorColor,
        flagBaseUrl: coreLibrary.args.flagBaseUrl,
        iconUrl: coreLibrary.args.iconUrl,
      }),
      document.getElementById('root')
    )
  })
  .catch(error => {
    widgetModule.removeWidget()
    console.debug('event widget:', error)
    throw error
  })
