import React from 'react';
import { ControlButton, ControlButtonProps } from 'smart-builder-sdk';

import { CogIcon } from '../icons/cog-icon';

export function OptionsControlButton<T>(props: ControlButtonProps<T, { label: string }>) {
  return (
    <ControlButton active={false} {...props}>
      <CogIcon />
    </ControlButton>
  );
}
