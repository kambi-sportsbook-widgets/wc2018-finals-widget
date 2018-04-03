import React from "react";
import PropTypes from "prop-types";
import { translationModule } from "kambi-widget-core-library";
import DateComponent from "./Date";

const t = translationModule.getTranslation.bind(translationModule);
import styles from "./Participants.scss";

const WORLD_CUP_2018_ID = 2000075007;

const Participants = ({ event, flagBaseUrl, iconUrl, onClick }) => {
  const isWorldCup = event.id === WORLD_CUP_2018_ID;
  console.log(isWorldCup);
  // Generates country icon url
  function generateCountryFlagUrl(country) {
    const normalisedCountryName = country.toLowerCase().replace(/\s/g, "_");
    return flagBaseUrl ? `${flagBaseUrl}/${normalisedCountryName}.svg` : "";
  }

  const homeFlagIcon =
    flagBaseUrl && isWorldCup ? (
      <i
        className="kw-custom-logo-large-type"
        style={{
          backgroundImage: `url("${generateCountryFlagUrl(
            event.countriesEnglishNames[0]
          )}")`
        }}
      />
    ) : (
      <i />
    );
  const awayFlagIcon =
    flagBaseUrl && isWorldCup ? (
      <i
        className="kw-custom-logo-large-type"
        style={{
          backgroundImage: `url("${generateCountryFlagUrl(
            event.countriesEnglishNames[1]
          )}")`
        }}
      />
    ) : (
      <i />
    );
  const logoIcon = iconUrl ? (
    <i
      className="kw-custom-logo-large-type"
      style={{
        backgroundImage: `url("${iconUrl}")`
      }}
    />
  ) : (
    <i />
  );

  return (
    <div className={styles.participants} onClick={onClick}>
      <div className={styles.team}>
        {homeFlagIcon}
        <h2 className={styles.label}>{event.homeName}</h2>
      </div>
      <div className={styles.logo}>
        {logoIcon}
        <h3 className={styles.label}>{t("championsLeague").toUpperCase()}</h3>
        <p className={styles.sublabel}>{t("leagueYear").toUpperCase()}</p>

        <DateComponent date={event.start} short={true} />
      </div>
      <div className={styles.team}>
        {awayFlagIcon}
        <h2 className={styles.label}>{event.awayName}</h2>
      </div>
    </div>
  );
};

Participants.propTypes = {
  event: PropTypes.object.isRequired,
  flagBaseUrl: PropTypes.string,
  iconUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Participants;
