import {
  offeringModule,
  // translationModule
} from 'kambi-widget-core-library'

// const t = translationModule.getTranslation.bind(translationModule)

/*
 * @property additionalBetOffersCriterionIds {Array.<number>} an array containing up to two criterion ids to be displayed in the widget
 * @returns {Promise} promise of a Kambi event object containing only required betoffers
*/
const getWCEventData = (additionalBetOffersCriterionIds) => {
  let finalEvent = []
  let eventType
  const BASE_FILTER = '/football/world_cup_2018'
  const QUALIFY_CRITERION_ID = [1004240929]
  const FINAL_CRITERION_ID = [1002978411, 1004240929]
  // const DEFAULT_CRITERION_ID = [1001221607]    // Champions League

  // get all events from the world cup
  return offeringModule.getEventsByFilter(BASE_FILTER)
    .then(events => {
      // Figure out if we have an array of events or a single one
      if (events.events) {
        // get not-started matches only
        const games = events.events.filter(event => {
          return event.event.type === 'ET_MATCH' || event.event.state('NOT_STARTED')
        })

        let quarterFinals = []
        let semiFinals = []
        let finals = []

        // choose games based on dates in Moscow time zone
        games.forEach(game => {
          if (
            // Quarter finals dates span with padding
            new Date('2018-07-06 00:00 UTC+3') < new Date(game.event.start) &&
            new Date(game.event.start) < new Date('2018-07-07 23:59 UTC+3')
            // // Date span for test purposes
            // new Date('2018-06-16 00:00 UTC+3') < new Date(game.event.start) &&
            // new Date(game.event.start) < new Date('2018-06-16 23:59 UTC+3')
            // // Date span for test purposes
          ) {
            quarterFinals.push(game)
            eventType = 'quaterFinals'
          } else if (
            // Finals dates span with padding
            new Date('2018-07-10 00:00 UTC+3') < new Date(game.event.start) &&
            new Date(game.event.start) < new Date('2018-07-11 23:59 UTC+3')
          ) {
            semiFinals.push(game)
            eventType = 'semiFinals'
          } else if(
            // Finals dates span with padding
            new Date('2018-07-14 00:00 UTC+3') < new Date(game.event.start)
          ) {
            finals.push(game)
            eventType = 'finals'
          }
        })

        let gamesToLookup
        if (quarterFinals.length > 0) {
          gamesToLookup = quarterFinals
        } else if (semiFinals.length > 0) {
          gamesToLookup = semiFinals
        } else {
          gamesToLookup = finals.reverse()
        }
        // Get all betoffers of all the games
        // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-offeringModule.html#.getLiveEventsByFilter__anchor
        return Promise.all(
          gamesToLookup.map(game => {
            return offeringModule.getEvent(game.event.id)
          })
        )
      }

      throw new Error(
        'Event widget: The id provided does not correspont to a match or has no bet offers',
        events.event
      )
    })
    .then(events => {
      events.forEach((event, index) => {
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
        finalEvent[index] = event

      })

      // Get all competition events
      // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-offeringModule.html#.getLiveEventsByFilter__anchor
      return offeringModule.getEventsByFilter(BASE_FILTER + '/all/all/competitions')
    })
    .then(tournamentEvents => {
      // Filter events based on citerion ids that are selected depending on the stage of the tournament
      const criteria = eventType !== 'final'? QUALIFY_CRITERION_ID: FINAL_CRITERION_ID
      const competitionEvents = tournamentEvents.events.filter(event => {
        return event.betOffers.length > 0?
          criteria.indexOf(event.betOffers[0].criterion.id) >= 0:
          false
      })

      return Promise.all(competitionEvents.map(event => {
        return offeringModule.getEvent(event.event.id)
      }))
    })
    .then(competitionEventData => {
      const result = finalEvent.map((event, index) => {

        // Extract betting offer for Playing countries
        const countries = event.event.englishName.split('-')
          .map(item => item.trim())
        event.event.countriesEnglishNames = countries

        // Get bet offers and inject them into the displayed event
        // Offers are being overwritten so only the last event from the criterion id list is actually displayed
        let tournamentBetOffer
        competitionEventData.forEach(competitionEvent => {
          let betOffer
          if (competitionEvent.betOffers.length > 1 && eventType !== 'final') {
            betOffer = competitionEvent.betOffers.find(offer => {
              return offer.to === 2
            })
            // // Overwirte the label param but only for the non-final events
            // betOffer.criterion.label = t('qualify')
          } else {
            betOffer = competitionEvent.betOffers[0]
          }

          const tournamentBetOfferCandidate = Object.assign({}, betOffer)
          tournamentBetOfferCandidate.outcomes = tournamentBetOfferCandidate.outcomes.filter(offer => {
            return countries.indexOf(offer.englishLabel) >= 0
          })
          if (tournamentBetOfferCandidate.outcomes.length > 0) {
            tournamentBetOffer = tournamentBetOfferCandidate
          }
        })
        // Add new bet offers to event object to pass to React
        event.betOffers.splice(1, 0, tournamentBetOffer)

        return event
      })
      return result
    })
}

export default getWCEventData
