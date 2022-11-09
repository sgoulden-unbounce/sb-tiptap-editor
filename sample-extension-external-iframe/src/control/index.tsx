import React, { useState } from 'react';
import { HelpIcon } from 'smart-builder-components';
import { Button, ComponentProps, Tooltip } from 'smart-builder-sdk';

import {
  Container,
  Error,
  StyledInputContainer,
  StyledInputLabelWithTooltipWrapper,
  StyledLabelConversion,
  StyledToggle,
} from '../styled';
import { Props } from '../types';
import { Input } from './input';

const CALENDLY_REGEX = /^[-a-zA-Z0-9()@:%_+~#?&/=]*$/;

const getCalendlyEvent = (newValue: string) => {
  try {
    const { hostname, pathname, search } = new URL(newValue);
    if (hostname !== 'calendly.com' || pathname === '') {
      return null;
    } else {
      return `${pathname.replace(/^\/+/g, '')}${search}`;
    }
  } catch {
    // It wasn't a URL
    return CALENDLY_REGEX.test(newValue) ? newValue : null;
  }
};

export const CalendlyControlComponent = ({
  data: { username, height, trackConversion },
  dispatch,
  closePanel,
}: ComponentProps<Props, { closePanel: () => void }>) => {
  const [localUsername, setLocalUsername] = useState<string>(username);
  const [localHeight, setLocalHeight] = useState<number>(height);
  const [validUsername, setValidUsername] = useState(true);
  const [validHeight, setValidHeight] = useState(true);

  const dirty = localUsername !== username || localHeight !== height;

  const allowApply = validUsername && validHeight && dirty;

  const updateCalendlySettings = () => {
    const eventName = getCalendlyEvent(localUsername);
    if (eventName) {
      setValidUsername(true);
      dispatch((api) => {
        api.get('username').set(eventName);
        api.get('height').set(localHeight);
      });
      closePanel();
    } else {
      setValidUsername(false);
    }
  };

  const toggleTracking = (newVal: boolean) => {
    dispatch((api: any) => api.get('trackConversion').toggleTrackingEnabled(newVal));
  };

  const handleLocalUsername = (newValue: string) => {
    setValidUsername(true);
    setLocalUsername(newValue);
  };

  const handleLocalHeight = (newValue: string | number) => {
    if (newValue && !isNaN(Number(newValue))) {
      setValidHeight(true);
    } else {
      setValidHeight(false);
    }
    setLocalHeight(newValue as number);
  };

  return (
    <Container>
      {!validHeight && <Error>Invalid Height.</Error>}
      <StyledInputLabelWithTooltipWrapper>
        Username / Event
        <span style={{ width: '8px' }} />
        <Tooltip trigger={<HelpIcon />} yAlign="bottom" xAlign="center" width={264}>
          Calendly username or URL <br />
          <code>https://calendly.com/username</code>
          <br />
          For specific event enter <br />
          <code>username/event-name</code>
        </Tooltip>
      </StyledInputLabelWithTooltipWrapper>
      <Input
        label={''}
        type="text"
        value={localUsername}
        placeholder="steve-jones/30min"
        setValue={(value) => handleLocalUsername(value.toString())}
      />
      {!validUsername && (
        <Error>
          <b>Invalid Username / Event URL.</b>
        </Error>
      )}
      <StyledInputContainer>
        <Input type="number" value={localHeight} label="Height" setValue={handleLocalHeight} /> px
      </StyledInputContainer>
      <StyledLabelConversion htmlFor="app-conversion-tracking">
        Conversion Tracking
        <StyledToggle
          value={trackConversion.trackingEnabled}
          onClick={() => toggleTracking(!trackConversion.trackingEnabled)}
          data-testid="app-conversion-tracking"
        />
      </StyledLabelConversion>
      <Button onClick={updateCalendlySettings} disabled={!allowApply}>
        Apply
      </Button>
    </Container>
  );
};
