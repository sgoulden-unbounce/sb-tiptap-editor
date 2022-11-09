import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { CalendlyViewer, getCalendlyScript } from './calendly-viewer';

const mockFunction = jest.fn();

const ScriptMock = ({ ...props }) => (
  <script data-testid={props?.externalScript?.scriptId} src={props?.externalScript?.src}>
    {props?.externalScript?.onloadMethod}
  </script>
);

jest.mock('smart-builder-sdk', () => ({
  ...jest.requireActual('smart-builder-sdk'),
  Script: ScriptMock,
}));

const renderCalendlyComponent = () => {
  return render(
    <CalendlyViewer
      data={{
        username: '',
        height: 0,
        trackConversion: {
          trackingEnabled: false,
        },
      }}
      dispatch={mockFunction}
      isSelected={false}
      entityId={''}
      mode={{
        type: 'edit',
      }}
    />,
  );
};

describe('Calendly viewer', () => {
  test('display calendly viewer', () => {
    renderCalendlyComponent();
    const component = screen.getByTestId('calendly-script');
    expect(component).toBeInTheDocument();
  });

  test('add calendly script correctly', () => {
    renderCalendlyComponent();
    const script = screen.getByTestId('calendly-script');
    expect(script.innerHTML).toBe(getCalendlyScript('-calendly-calendar', '', false));
  });
});
