import React from 'react';
import { ControlPanelProps } from 'smart-builder-sdk';

import { StyledLabelConversion, StyledToggle } from '../styled';
import { DataStructure } from './hello-world';

export const Panel = ({ data: { tracking }, dispatch }: ControlPanelProps<DataStructure>) => {
  const toggleTracking = (newVal: boolean) => {
    dispatch((api: any) => api.get('tracking').toggleTrackingEnabled(newVal));
  };
  return (
    <StyledLabelConversion data-testid="hello-world-conversion-label">
      Conversion Tracking
      <StyledToggle
        data-testid="hello-world-conversion-toggle"
        value={tracking.trackingEnabled}
        onClick={() => toggleTracking(!tracking.trackingEnabled)}
      />
    </StyledLabelConversion>
  );
};
