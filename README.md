# wc2018-finals-widget / champions-league-finals-widget

![](./screenshot.png)

Finals widget is shown pre-match for the Semifinal, Bronze martch and Final. Available both in web browser and mobile but different number of odds are being shown.

## Configuration

Arguments and their default values:
```json
"arguments": {
  "widgetTrackingName": "wc2018-finals",
  "additionalBetOffersCriterionIds": [
    1001159926,
    1001642858
  ],
  "flagBaseUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons",
  "iconUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons/champions_league.svg",
  "backgroundUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg",
  "blendWithOperatorColor": true,
  "fetchData": {
    "baseFilter":"football/champions_league",
    "qualifyCriterionId": [ 1001159599 ],
    "finalCriterionId": [ 1001221607 ]
  },
  "fetchDates": {
    "quarterFinals": {},
    "semiFinals": {
      "start": "2018-07-10T00:00",
      "end": "2018-07-11T23:59"
    },
    "finals": {
      "start": "2018-07-14T00:00"
    }
  }
}
```

1. `widgetTrackingName` - string - tracking name for analytics purposes
2. `additionalBetOffersCriterionIds` - Array<string> - list of criteria ids to display in addition to match outcome and tournament position
3. `flagBaseUrl` - string - url potinting to a directory containing flags of all competitors
4. `iconUrl` - string - url poitning to a file that should be used as an icon
5. `backgroundUrl` - string - url poitning to a file that should be used as a background
6. `blendWithOperatorColor` - boolean - should the background be covered with a colored overlay
7. `fetchData` - Object - containing information regarding which betoffers to display
  1. `baseFilter` - string - url path to tournament
  2. `qualifyCriterionId` - Array<number> - list of tournament events critera ids to display before finals (citeria at the end of the list, if they are available, overwrite those at the begining)
  3. `finalCriterionId` - Array<number> - list of tournament events critera ids to display during finals (citeria at the end of the list, if they are available, overwrite those at the begining)
8. `fetchDates` - Object - containing information regarding date spans of tournament stages
  1. `<stage-name>{ quarterFinals | semiFinals | finals }`
    1. `<stage-date-border>{ start | end }` - string - date string compliant with `Date.parse()` method [(described here)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) marking the time the tournament stage starts of ends

## Arguments for testing purposes

If there are no matches yet to be displayed, due to progresive scheduling, you can make changes to provided date spans to force the wideget to display some matches. For example:
```json
"arguments": {
  "fetchDates": {
    "quarterFinals": {
      "start": "2018-04-03T00:00",
      "end": "2018-04-11T23:59"
    },
    "semiFinals": {
      "start": "2018-04-24T00:00",
      "end": "2018-05-02T23:59"
    },
    "finals": {
      "start": "2018-05-26T00:00"
    }
  }
}
```

## Bet Offers selection logic

1. Upcoming matches are sorted into groups based on their starting time: quarter finals, semi finals and finals. If there are no lower-level upcoming matches the widget shows the next next stage.
2. Match outcome and up to two other bets specified in `additionalBetOffersCriterionIds` are displayed for all matches.
3. Additionaly one bet offer, matching the participating countries, from tournamet events is displayed. Before finals `qualifyCriterionId` is a source of competition events criteria. During finals `finalCriterionId` is a source of competition events criteria. The widget tries to find any competition bet offers matching the first criterion from the list, then moves to the next. Default criteria correspond to **Tournament Position** bet offer for all matches before finals, and to **Third Place** and **Tournament Position** for the finals.
4. For all matches before finals the widget displays a **Tournament Position** bet offer containing the **Top 2** offer. For the final the **Winner** offer is displayed.
5. If no betoffers with matching criteria ids are found in the torunament event the widget looks for a matching bet offer in rematch events

## Build Instructions

Please refer to the [core-library](https://github.com/kambi-sportsbook-widgets/widget-core-library)
