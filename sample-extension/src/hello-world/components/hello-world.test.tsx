import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { Component } from 'react';
import { ComponentProps } from 'smart-builder-sdk';

import HelloWorld, { DataStructure } from './hello-world';

const ScriptMock = ({ ...props }) => (
  <script data-testid={props?.externalScript?.scriptId} src={props?.externalScript?.src}>
    {props?.externalScript?.onloadMethod}
  </script>
);

jest.mock('smart-builder-sdk', () => ({
  ...jest.requireActual('smart-builder-sdk'),
  Script: ScriptMock,
}));

jest.mock('ub-shared', () => ({
  WithStyles: (component: Component) => component,
}));

const setMock = jest.fn();
const props = {
  data: { fullname: 'Fullname', isButtonSet: true, styles: { textAlign: '' }, tracking: { trackingEnabled: true } },
  dispatch: (callback: any) => {
    callback({ get: () => ({ set: setMock }) });
  },
  mode: {
    type: 'view',
  },
} as ComponentProps<DataStructure>;

const renderComponent = (isButtonSet: boolean) => {
  const { data, dispatch, mode } = props;
  return render(
    <HelloWorld
      data={{
        ...data,
        isButtonSet: isButtonSet,
      }}
      dispatch={dispatch}
      mode={mode}
      isSelected={false}
      entityId={''}
    />,
  );
};

describe('Hello World Component', () => {
  test('renders empty state', async () => {
    renderComponent(false);
    await waitFor(() => {
      expect(screen.getByTestId('hello-world-first-name-btn').textContent).toEqual('Click Here to set up the button');
    });
  });

  test('renders content when button is set', async () => {
    renderComponent(true);
    await waitFor(() => {
      expect(screen.getByTestId('hello-world-text').textContent).toEqual('Your name is: Fullname');
    });
  });

  test('Opens modal', async () => {
    renderComponent(true);

    fireEvent.click(screen.getByTestId('hello-world-change-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('hello-world-first-name-input')).not.toBeNull();
    });
  });

  test('Update fullname', async () => {
    const { queryByTestId } = renderComponent(true);

    fireEvent.click(screen.getByTestId('hello-world-change-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('hello-world-first-name-input')).not.toBeNull();
    });

    fireEvent.change(screen.getByTestId('hello-world-first-name-input'), { target: { value: 'cheeseburger' } });
    fireEvent.click(screen.getByTestId('hello-world-save-btn'));

    await waitFor(() => {
      expect(queryByTestId('hello-world-first-name-input')).toBeNull();

      expect(setMock).toHaveBeenCalledWith('cheeseburger');
    });
  });
});
