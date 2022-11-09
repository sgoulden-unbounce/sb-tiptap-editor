import React from 'react';
import { ControlButton, WithControls } from 'smart-builder-sdk';
import { component, Schema } from 'ub-shared';

import { CalendlyControlComponent } from '../control';
import { CogIcon } from '../icons/cog-icon';
import { CalendlyViewer } from './calendly-viewer';

const CalendlyComponentWithControls = WithControls(CalendlyViewer, [
  {
    id: 'appSettings',
    label: 'Settings',
    Button: (props) => (
      <ControlButton label="Settings" active={false} {...props}>
        <CogIcon />
      </ControlButton>
    ),
    Panel: (props) => <CalendlyControlComponent {...props} />,
  },
]);

export const Component = component({
  componentTypeId: 'helloAgainWorld',
  displayName: 'helloAgainWorld',
  schema: Schema.object({
    username: Schema.string(),
    height: Schema.number().default(580),
    trackConversion: Schema.formUrl(),
  }),
  Component: CalendlyComponentWithControls,
  tags: ['swappable', 'conversion', 'newControls', 'isFullWidth', 'isFullHeight'],
});
