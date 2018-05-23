import React from 'react'
import ReactDOM from 'react-dom'
import { coreLibrary, widgetModule } from 'kambi-widget-core-library'
import MainComponent from './js/Components/MainComponent'

import getWCEventData from './js/Services/Kambi'

import './scss/app.scss'
import './index.html'

// Initialize kambi's api
// http://kambi-sportsbook-widgets.github.io/widget-core-library/module-coreLibrary.html#.init__anchor
coreLibrary
  .init({
    widgetTrackingName: 'champion-league-finals',
    additionalBetOffersCriterionIds: [
      1001159926, // Total goals
      1001642858, // both teams to score
    ], // array with up to 2 numbers, find out the criterionIds of the mock betoffers to use as default
    flagBaseUrl: '', // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    iconUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons/champions_league.svg', // string with the icon URL, should have a default if absent
    backgroundUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg', // string with the image to use as background-image
    blendWithOperatorColor: true, // determines if background should be blended with operator color. (Normally not wanted if providing own background image)
    fetchData: {
      baseFilter: 'football/champions_league',
      qualifyCriterionId: [1001159600], // Team to go through from the match
      finalCriterionId: [1001221607], // match for third place not occuring in this tournament
    },
    fetchDates: {
      quarterFinals: {
        start: '2018-04-03T00:00',
        end: '2018-04-12T23:59',
      },
      semiFinals: {
        start: '2018-04-24T00:00',
        end: '2018-05-02T23:59',
      },
      finals: {
        start: '2018-05-26T00:00',
      },
    },
  })
  .then(() => {
    return getWCEventData(
      coreLibrary.args.additionalBetOffersCriterionIds,
      coreLibrary.args.fetchData,
      coreLibrary.args.fetchDates
    )
  })
  .then(data => {
    // Renders the widget
    ReactDOM.render(
      React.createElement(MainComponent, {
        data: data,
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
