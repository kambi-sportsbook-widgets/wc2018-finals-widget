# wc2018-finals-widget / champions-league-finals-widget

![](./screenshot.png)

Finals widget is shown pre-match for the Semifinal, Bronze martch and Final. Available both in web browser and mobile but different number of odds are being shown.

## Configuration

Arguments and their default values:

```json
"arguments": {
  "widgetTrackingName": "wc2018-finals",
  "flagBaseUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons",
  "iconUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/icons/champions_league.svg",
  "backgroundUrl": "https://d1fqgomuxh4f5p.cloudfront.net/tournamentdata/worldcup2018/overview-bw-bg-desktop.jpg",
  "filter": "/football/world_cup_2018",
  "criterionIds": {
      "topLeftBetOffer": {
        "knockout": 1001159858,
        "bronze": 1001159858,
        "final": 1001159858,
      },
      "topRightBetOffer": {
        "knockout": 1001159926,
        "bronze": 1001159926,
        "final": 1001159926,
      },
      "bottomLeftBetOffer": {
        "knockout": 1001159599,
        "bronze": 1002978411,
        "final": 1001159600,
      },
      "bottomRightBetOffer": {
        "knockout": 1001642858,
        "bronze": 1001642858,
        "final": 1001642858,
      },
    },
  "tournamentDates": {
    "knockout": {
      "start": "2018-06-01T00:00",
      "end": "2018-07-11T23:59"
    },
    "bronze": {
      "start": "2018-07-11T00:00",
      "end": "2018-07-14T23:59"
    },
    "final": {
      "start": "2018-07-11T00:00",
      "end": "2018-07-15T23:59"
    }
  }
}
```

1.  `widgetTrackingName` - string - tracking name for analytics purposes
2.  `flagBaseUrl` - string - url potinting to a directory containing flags of all competitors
3.  `iconUrl` - string - url poitning to a file that should be used as an icon
4.  `backgroundUrl` - string - url poitning to a file that should be used as a background
5.  `blendWithOperatorColor` - boolean - should the background be covered with a colored overlay
6.  `filter` - string - filter path to the tournament
7.  criterionIds - Object - object containing criterion ids for the 4 areas of the widget, based on final type

- `topLeftBetOffer` - Full time
- `topRightBetOffer` - Total goals
- `bottomLeftBetOffer` - Team to go through / Win bronze / Win the trophy
- `bottomRightBetOffer` - Both teams to score

8.  `tournamentDates` - Object - containing information regarding date spans of tournament stages
    1.  `<stage-name>{ knockout | semiFinals | finals }`
    1.  `<stage-date-border>{ start | end }` - string - date string compliant with `Date.parse()` method [(described here)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) marking the time the tournament stage starts of ends

## Testing

Due to progressive scheduling, the widget is currently modified to display regardless of finding the qualification betOffer (`bottomLeftBetOffer`) so that it can be tested prior to the final events being available through the API.

## Build Instructions

Please refer to the [core-library](https://github.com/kambi-sportsbook-widgets/widget-core-library)
