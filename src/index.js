import React from 'react'
import ReactDOM from 'react-dom'
import { coreLibrary, widgetModule } from 'kambi-widget-core-library'
import MainComponent from './js/Components/MainComponent'

import getTournamentData from './js/Services/Kambi'

import './scss/app.scss'
import './index.html'

// Initialize kambi's api
// http://kambi-sportsbook-widgets.github.io/widget-core-library/module-coreLibrary.html#.init__anchor
coreLibrary
  .init({
    widgetTrackingName: 'wc2018-finals',
    // additionalBetOffersCriterionIds: [
    //   1001159926, // Total goals
    //   1001642858, // both teams to score
    // ], // array with up to 2 numbers, find out the criterionIds of the mock betoffers to use as default
    flagBaseUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons', // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    iconUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons/world_cup_2018.svg', // string with the icon URL, should have a default if absent
    backgroundUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg', // string with the image to use as background-image
    blendWithOperatorColor: true, // determines if background should be blended with operator color. (Normally not wanted if providing own background image)
    // fetchData: {
    //   baseFilter: '/football/world_cup_2018',
    //   qualifyCriterionId: [1004240929],
    //   finalCriterionId: [1002978411, 1004240929],
    // },

    // filter: '/football/world_cup_2018',
    filter: '/football/champions_league',
    criterionIds: {
      topLeftBetOffer: {
        // Full time
        quarter: 1001159858,
        semi: 1001159858,
        final: 1001159858,
        fallback: 1001159858,
      },
      topRightBetOffer: {
        // Total goals
        quarter: 1001159926,
        semi: 1001159926,
        final: 1001159926,
        fallback: 1001159926,
      },
      bottomLeftBetOffer: {
        // Qualify / Win Bronze/ Win the Trophy
        quarter: 1001159599,
        semi: 1002978411,
        final: 1001159600,
        fallback: 1001159599,
      },
      bottomRightBetOffer: {
        // Both teams to score
        quarter: 1001642858,
        semi: 1001642858,
        final: 1001642858,
        fallback: 1001642858,
      },
    },

    // // Date span for World Cup 2018
    // tournamentDates: {
    //   quarter: {
    //     start: '2018-03-06T00:00',
    //     end: '2018-07-07T23:59',
    //   },
    //   semi: {
    //     start: '2018-07-10T00:00',
    //     end: '2018-07-11T23:59',
    //   },
    //   final: {
    //     start: '2018-07-15T00:00',
    //     end: '2018-07-15T23:59',
    //   },
    // },
    // // Date span for World Cup 2018

    // Date span for test purposes to be used with World Cup data
    tournamentDates: {
      quarter: {
        start: '2018-04-03T00:00',
        end: '2018-04-12T23:59',
      },
      semi: {
        start: '2018-04-24T00:00',
        end: '2018-05-02T23:59',
      },
      final: {
        start: '2018-05-26T00:00',
        end: '2018-05-26T23:59',
      },
    },
    // Date span for test purposes to be used with World Cup data
  })
  .then(() => {
    const { tournamentDates, filter, criterionIds } = coreLibrary.args
    return getTournamentData(filter, criterionIds, tournamentDates)
    // return getWCEventData(
    //   coreLibrary.args.additionalBetOffersCriterionIds,
    //   coreLibrary.args.fetchData,
    //   coreLibrary.args.fetchDates
    // )
  })
  .then(events => {
    // Renders the widget
    ReactDOM.render(
      React.createElement(MainComponent, {
        data: events,
        backgroundUrl: coreLibrary.args.backgroundUrl,
        blendWithOperatorColor: coreLibrary.args.blendWithOperatorColor,
        flagBaseUrl: coreLibrary.args.flagBaseUrl,
        iconUrl: coreLibrary.args.iconUrl,
      }),
      coreLibrary.rootElement
    )

    // unmounts application at root element on widget remove (for embedded mode)
    const originalOnWidgetRemoved = coreLibrary.args.onWidgetRemoved
    coreLibrary.args.onWidgetRemoved = err => {
      ReactDOM.unmountComponentAtNode(coreLibrary.rootElement)
      if (originalOnWidgetRemoved) {
        originalOnWidgetRemoved(err)
      }
    }
  })
  .catch(error => {
    widgetModule.removeWidget()
    console.debug('event widget:', error)
    throw error
  })
