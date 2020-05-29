import React from 'react'
import '../scss/NoSession.scss'

const NoSession = () => (
  <div className="no-session">
    <div id="right-triangle"></div>
    <div className="left">
      <div className="diamond medium" id="one" />
      <div className="diamond medium" id="four" />
      <div className="diamond small" id="five" />
      <div className="boxGroupLeft">
        <div className="diamond large" id="two" />
        <div className="diamond small" id="three" />
      </div>
    </div>
    <div className="right">
      <div className="diamond small" id="six" />
      <div className="diamond medium" id="seven" />
      <div className="diamond medium-large" id="eight" />
      <div className="diamond large" id="nine" />
      <div className="diamond medium" id="ten" />
      <div className="diamond medium-small" id="eleven" />
      <div className="diamond medium" id="twelve" />
    </div>
  </div>
);

export default NoSession
