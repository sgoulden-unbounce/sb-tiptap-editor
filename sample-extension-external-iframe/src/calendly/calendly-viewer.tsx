import React from 'react';
import type { ComponentProps } from 'smart-builder-sdk';
import { Button, getAfterFormSubmitScript, Script } from 'smart-builder-sdk';

import manifest from '../../manifest';
import { EmptyActions, EmptyState, StyledImage, Wrapper } from '../styled';
import { Props } from '../types';

export const getCalendlyScript = (
  calendlyComponentId: string,
  username: string,
  trackConversion: boolean,
) => `(function () {
  var el = document.getElementById('${calendlyComponentId}'); // The element our app use
  if (el && el?.innerHTML) {
    el.innerHTML = '';
  }
  Calendly.initInlineWidget({ // Calendly function to insert our calendar 
    url: 'https://calendly.com/${username}',
    parentElement: document.getElementById('${calendlyComponentId}'),
    prefill: {},
    utm: {},
  });
  function isCalendlyEvent(e) {
    return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
  };
   
  window.addEventListener("message", function(e) {
    if(isCalendlyEvent(e) && ${trackConversion} && e.data.event === "calendly.event_scheduled") {
      ${getAfterFormSubmitScript(
        calendlyComponentId,
        trackConversion,
      )} // Runs our track conversion for each "scheduled event"
    }
  });
})()`;

export const CalendlyViewer = (props: ComponentProps<Props>) => {
  const {
    data: { username, height, trackConversion },
    mode,
    openPanel,
  } = props;
  const calendlyComponentId = `${props.entityId}-calendly-calendar`;

  const handleSetupButtonClick = () => {
    openPanel?.('appSettings');
  };

  return (
    <>
      {mode.type === 'edit' && <div style={{ height: '100%', position: 'absolute', width: '100%' }} />}
      <Wrapper customHeight={height} configured={!!username} id={calendlyComponentId}>
        {!username && (
          <EmptyState>
            <StyledImage src={manifest.iconUrl} alt="logo" />
            <EmptyActions>
              <Button onClick={handleSetupButtonClick}>Set Up an Event</Button>
            </EmptyActions>
          </EmptyState>
        )}
      </Wrapper>
      <Script
        mode={mode.type}
        externalScript={{
          scriptId: 'calendly-script',
          src: 'https://assets.calendly.com/assets/external/widget.js', // Your script's source, in this case calendly's widget
          onloadMethod: getCalendlyScript(calendlyComponentId, username, trackConversion.trackingEnabled), // The script your app will load
          condition: !!username, // You can use any condition as boolean, in this case we use the username
        }}
        dependencies={[username, height]}
      />
    </>
  );
};
