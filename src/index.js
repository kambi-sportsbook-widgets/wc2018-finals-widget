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
    flagBaseUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons', // string with the base URL, concatenate with the lowecased englishName of the team + ".svg" to generate final URL (replace spaces with _)
    iconUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons/world_cup_2018.svg', // string with the icon URL, should have a default if absent
    backgroundUrl:
      'https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg', // string with the image to use as background-image

    filter: '/football/world_cup_2018',
    criterionIds: {
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
    },

    // Date span for World Cup 2018
    tournamentDates: {
      knockout: {
        start: '2018-03-30T00:00', ////// THIS DATE IS SET TOO EARLY FOR PRE FINAL TESTING PURPOSES
        end: '2018-07-10T23:59',
      },
      bronze: {
        start: '2018-07-11T00:00',
        end: '2018-07-14T23:59',
      },
      final: {
        start: '2018-07-11T00:00',
        end: '2018-07-15T23:59',
      },
    },
    // Date span for World Cup 2018
  })
  .then(() => {
    const { tournamentDates, filter, criterionIds } = coreLibrary.args
    return getTournamentData(filter, criterionIds, tournamentDates)
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
