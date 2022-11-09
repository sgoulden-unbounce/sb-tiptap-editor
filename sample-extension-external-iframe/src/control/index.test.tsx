import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CalendlyControlComponent } from './index';

const mockFunction = jest.fn();
const mockDispatch = jest.fn();

type mockChildren = {
  children: JSX.Element;
  minimal: string;
};

const ChildComponent = ({ children, ...props }: mockChildren) => <div {...props}>{children}</div>;

jest.mock('../../config/global-dependencies/smart-builder-components', () => ({
  Checkbox: () => <div></div>,
  Label: ChildComponent,
  InputField: () => <div></div>,
  GroupRadioButton: () => <div></div>,
  RadioButton: () => <div></div>,
  TextArea: () => <div></div>,
  FieldValidation: () => <div></div>,
  DatePicker: () => <div></div>,
  DateRangePicker: () => <div></div>,
  Toggle: ChildComponent,
  DeleteButton: () => <div></div>,
  AddButton: () => <div></div>,
  Button: ChildComponent,
  ButtonLink: () => <div></div>,
  Link: () => <div></div>,
  MoreButton: () => <div></div>,
  IconButton: () => <div></div>,
  Dropdown: () => <div></div>,
  SearchBar: () => <div></div>,
  Tab: () => <div></div>,
  TabAnchor: () => <div></div>,
  Tabs: () => <div></div>,
  Tooltip: () => <div></div>,
  HelpIcon: () => <div></div>,
  FullScreenModal: () => <div></div>,
  CardContainer: () => <div></div>,
  CardList: () => <div></div>,
  CardListControls: () => <div></div>,
  CardsListWrapper: () => <div></div>,
  NoResults: () => <div></div>,
  ColorInput: () => <div></div>,
}));

const renderCalendlyControl = (username: string) => {
  return render(
    <CalendlyControlComponent
      closePanel={mockFunction}
      data={{
        username,
        height: 0,
        trackConversion: {
          trackingEnabled: false,
        },
      }}
      dispatch={mockDispatch}
      isSelected={true}
      entityId={''}
      mode={{
        type: 'edit',
      }}
    />,
  );
};

describe('Calendly cotrol', () => {
  beforeEach(() => jest.resetAllMocks());

  test('renders conversion tracking and dispatch call', () => {
    renderCalendlyControl('user-test');

    const conversionButton = screen.getByTestId('app-conversion-tracking');
    expect(conversionButton).toBeInTheDocument();
    expect(mockDispatch).toBeCalledTimes(0);

    userEvent.click(conversionButton);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('renders Apply button and dispatch call', () => {
    renderCalendlyControl('user-test');

    const applyButton = screen.getByText(/Apply/i);
    expect(applyButton).toBeTruthy();

    const input = screen.getByPlaceholderText('steve-jones/30min');
    fireEvent.change(input, { target: { value: 'boss-jones/30min' } });

    userEvent.click(applyButton);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('renders Apply button as disabled when user is incorrect', () => {
    renderCalendlyControl('');

    const applyButton = screen.getByText(/Apply/i);
    expect(applyButton).toHaveAttribute('disabled');

    /* Apply button clicked, dispatch should not be called */
    userEvent.click(applyButton);
    expect(mockDispatch).not.toBeCalled();
  });
});
