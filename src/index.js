import React from 'react'
import ReactDOM from 'react-dom'
import {
  coreLibrary,
  widgetModule,
} from 'kambi-widget-core-library'
import MainComponent from './js/Components/MainComponent'

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
    flagBaseUrl: "./assets/flags",   // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    iconUrl: "./assets/world_cup_2018.svg",  // string with the icon URL, should have a default if absent
    backgroundUrl: 'assets/overview-bw-bg-desktop.jpg', // string with the image to use as background-image
    blendWithOperatorColor: true, // determines if background should be blended with operator color. (Normally not wanted if providing own background image)
    // Data for World Cup 2018
    fetchData: {
      baseFilter:'/football/world_cup_2018',
      qualifyCriterionId: [ 1004240929 ],
      finalCriterionId: [ 1002978411, 1004240929 ]
    },
    // Data for World Cup 2018
    // // Date span for World Cup 2018
    // fetchDates: {
    //   quarterFinals: {
    //     start: new Date('2018-07-06 00:00 UTC+3'),
    //     end: new Date('2018-07-07 23:59 UTC+3')
    //   },
    //   semiFinals: {
    //     start: new Date('2018-07-10 00:00 UTC+3'),
    //     end: new Date('2018-07-11 23:59 UTC+3')
    //   },
    //   finals: {
    //     start: new Date('2018-07-14 00:00 UTC+3')
    //   }
    // },
    // // Date span for World Cup 2018
    
    // // Data for Champions League
    // fetchData: {
    //   baseFilter:'football/champions_league',
    //   qualifyCriterionId: [ 1001221607 ], // Top 2 bet not available in this tournament
    //   finalCriterionId: [ 1001221607 ] // match for third place not occuring in this tournament
    // },
    // // Data for Champions League
    // // Date span for Champions League
    // fetchDates: {
    //   quarterFinals: {
    //     start: new Date('2018-04-03 00:00 UTC+0'),
    //     end: new Date('2018-04-11 23:59 UTC+0')
    //   },
    //   semiFinals: {
    //     start: new Date('2018-04-24 00:00 UTC+0'),
    //     end: new Date('2018-05-02 23:59 UTC+0')
    //   },
    //   finals: {
    //     start: new Date('2018-05-26 00:00 UTC+0')
    //   }
    // },
    // // Date span for Champions League

    // Date span for test purposes to be used with World Cup data
    fetchDates: {
      quarterFinals: {
        start: new Date('2018-06-16 00:00 UTC+3'),
        end: new Date('2018-06-16 23:59 UTC+3')
      },
      semiFinals: {
        start: new Date('2018-07-10 00:00 UTC+3'),
        end: new Date('2018-07-11 23:59 UTC+3')
      },
      finals: {
        start: new Date('2018-07-14 00:00 UTC+3')
      }
    }
    // Date span for test purposes to be used with World Cup data
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
