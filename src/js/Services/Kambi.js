import {
  offeringModule
  // translationModule
} from "kambi-widget-core-library";

// const t = translationModule.getTranslation.bind(translationModule)

/*
 * @property additionalBetOffersCriterionIds {Array.<number>} an array containing up to two criterion ids to be displayed in the widget
 * @returns {Promise} promise of a Kambi event object containing only required betoffers
*/
const getWCEventData = (additionalBetOffersCriterionIds, data, dates) => {
  let finalEvent = [];
  let eventType;
  let competitionEventsNum;

  // get all events from the world cup
  return Promise.all([
    offeringModule.getEventsByFilter(data.baseFilter),
    offeringModule.getEventsByFilter(data.baseFilter + "/all/all/competitions")
  ])
    .then(responses => {
      const events = responses[0];
      const tournamentEvents = responses[1];
      // Figure out if we have an array of events or a single one
      if (events.events) {
        // get not-started matches only
        const games = events.events.filter(event => {
          return (
            event.event.type === "ET_MATCH" &&
            event.event.state === "NOT_STARTED"
          );
        });

        const now = new Date();
        let quarterFinals = [];
        let semiFinals = [];
        let finals = [];

        // choose games based on dates in Moscow time zone
        games.forEach(game => {
          if (
            // Quarter finals dates span with padding
            now < new Date(dates.quarterFinals.end) &&
            new Date(dates.quarterFinals.start) < new Date(game.event.start) &&
            new Date(game.event.start) < new Date(dates.quarterFinals.end)
          ) {
            quarterFinals.push(game);
            eventType = "quaterFinals";
          } else if (
            // Finals dates span with padding
            now < new Date(dates.semiFinals.end) &&
            new Date(dates.semiFinals.start) < new Date(game.event.start) &&
            new Date(game.event.start) < new Date(dates.semiFinals.end)
          ) {
            semiFinals.push(game);
            eventType = "semiFinals";
          } else if (
            // Finals dates span with padding
            now < new Date(dates.finals.end) &&
            new Date(dates.finals.start) < new Date(game.event.start)
          ) {
            finals.push(game);
            eventType = "finals";
          }
        });

        let gamesToLookup;
        if (quarterFinals.length > 0) {
          gamesToLookup = quarterFinals;
        } else if (semiFinals.length > 0) {
          gamesToLookup = semiFinals;
        } else if (finals.length > 0) {
          gamesToLookup = finals.reverse();
        } else {
          throw new Error(
            `No events available for supplied filter: ${data.baseFilter}`,
            events.event
          );
        }

        // Prepare games promises
        const promisesMatches = gamesToLookup.map(game => {
          return offeringModule.getEvent(game.event.id);
        });

        // Add tournament events promises
        // Filter events based on citerion ids that are selected depending on the stage of the tournament
        const criteria =
          eventType !== "finals"
            ? data.qualifyCriterionId
            : data.finalCriterionId;
        const competitionEvents = tournamentEvents.events.filter(event => {
          return event.betOffers.length > 0
            ? criteria.indexOf(event.betOffers[0].criterion.id) >= 0
            : false;
        });

        competitionEventsNum = competitionEvents.length;
        const promisesCompetition = competitionEvents.map(event => {
          return offeringModule.getEvent(event.event.id);
        });

        // Get all betoffers of all the games
        // http://kambi-sportsbook-widgets.github.io/widget-core-library/module-offeringModule.html#.getLiveEventsByFilter__anchor
        return Promise.all([...promisesMatches, ...promisesCompetition]);
      }

      throw new Error(
        `No events available for supplied filter: ${data.baseFilter}`,
        events.event
      );
    })
    .then(responses => {
      const events = competitionEventsNum
        ? responses.slice(0, competitionEventsNum * -1)
        : responses.slice(0);
      const competitionEventData = competitionEventsNum
        ? responses.slice(competitionEventsNum * -1)
        : [];

      events.forEach((event, index) => {
        // Filter bet offers based on criterion ids provided in params
        let newBetOffers = [];
        // Add main offer
        const mainBetoffer = event.betOffers.find(offer => offer.main);
        if (mainBetoffer) {
          newBetOffers.push(mainBetoffer);
        }

        // Add selected bet offers
        additionalBetOffersCriterionIds.forEach(crit => {
          let result = event.betOffers.find(
            offer => offer.criterion.id === crit
          );
          if (result) newBetOffers.push(result);
        });

        event.betOffers = newBetOffers;
        finalEvent[index] = event;
      });

      // Inject competition events
      const result = finalEvent.map((event, index) => {
        // Extract betting offer for Playing countries
        const countries = event.event.englishName
          .split("-")
          .map(item => item.trim());
        event.event.countriesEnglishNames = countries;

        // Get bet offers and inject them into the displayed event
        // Offers are being overwritten so only the last event from the criterion id list is actually displayed
        let tournamentBetOffer;
        competitionEventData.forEach(competitionEvent => {
          let betOffer;
          if (competitionEvent.betOffers.length > 1 && eventType !== "finals") {
            betOffer = competitionEvent.betOffers.find(offer => {
              return offer.to === 2;
            });
            if (!betOffer) {
              betOffer = competitionEvent.betOffers[0];
            }
          } else {
            betOffer = competitionEvent.betOffers[0];
          }

          const tournamentBetOfferCandidate = Object.assign({}, betOffer);
          tournamentBetOfferCandidate.outcomes = tournamentBetOfferCandidate.outcomes.filter(
            offer => {
              return countries.indexOf(offer.englishLabel) >= 0;
            }
          );
          if (tournamentBetOfferCandidate.outcomes.length > 0) {
            tournamentBetOffer = tournamentBetOfferCandidate;
          }
        });
        // Add new bet offers to event object to pass to React
        if (tournamentBetOffer)
          event.betOffers.splice(1, 0, tournamentBetOffer);

        return event;
      });

      // Sort by starting date
      result.sort((a, b) => new Date(a.event.start) - new Date(b.event.start));

      return result;
    });
};

export default getWCEventData;
