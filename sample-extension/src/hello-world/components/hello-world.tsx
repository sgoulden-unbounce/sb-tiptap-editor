import React, { useState } from 'react';
import { ComponentProps, getAfterFormSubmitScript, Script, WithControls, WithStylesProps } from 'smart-builder-sdk';
import { WithStyles } from 'ub-shared';

import manifest from '../../../manifest';
import { EmptyActions, EmptyState, StyledImg, Text, Wrapper } from '../styled';
import { ChangeFullNameModal } from './change-full-name-modal';
import { Panel } from './control-panel';
import { OptionsControlButton } from './options-control-button';
import { getInlineScript, runOnloadMethod } from './script';

export type DataStructure = {
  fullname: string;
  isButtonSet: boolean;
  styles: { textAlign: string };
  tracking: { trackingEnabled: boolean };
};

const HelloWorld = ({ data, dispatch, className, mode, entityId }: ComponentProps<DataStructure, WithStylesProps>) => {
  const { fullname, isButtonSet, tracking } = data;
  const [showModal, setShowModal] = useState(false);
  const buttonId = `myAppButton-${entityId}`;

  const updateFullName = (newFullName: string) => {
    dispatch((api) => api.get('fullname').set(newFullName));
    setShowModal(false);
  };
  const isViewMode = mode.type === 'view';

  return (
    <>
      {isButtonSet ? (
        <>
          <Wrapper>
            <Text data-testid="hello-world-text">{`Your name is: ${fullname}`}</Text>
            {/* You need to pass "className" to your button so the style changes done in "Design Settings" can be applied */}
            <button
              id={buttonId}
              className={className}
              data-testid="hello-world-change-btn"
              onClick={() => setShowModal(true)}
            >
              Click here to change your name
            </button>
          </Wrapper>
          {tracking.trackingEnabled && mode.type === 'publish' ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (function () {
                  // Grab the form and add the conversion tracking into the submit script.
                  const button = document.getElementById('${buttonId}');
                  // This is a simple example of how to add conversion tracking to your app, try it on a public page by clicking the button
                  button.onclick=function () { 
                    ${getAfterFormSubmitScript(buttonId, true)}
                  }
                }())
              `,
              }}
            />
          ) : null}
          {showModal && (
            <ChangeFullNameModal fullname={fullname} onUpdate={updateFullName} onClose={() => setShowModal(false)} />
          )}
        </>
      ) : (
        <EmptyState data-testid="hello-world-content">
          <StyledImg src={manifest.iconUrl} alt="logo" />
          <EmptyActions className="empty-actions">
            <button
              className={className}
              data-testid="hello-world-first-name-btn"
              onClick={() => dispatch((api) => api.get('isButtonSet').set(true))}
            >
              Click Here to set up the button
            </button>
          </EmptyActions>
        </EmptyState>
      )}
      {/* To test the External Script we are loading momentjs from a CDN(we chose moment just for simplicity), after loading the library the onload method will run. If you see in the example the mode is set to view and we are using condition: isViewMode. To test it in "edit" mode, you can modify mode to edit and condition to true and the alert should show when editing your landing page  */}
      {isViewMode ? (
        <Script
          mode="view"
          dependencies={[]}
          externalScript={{
            src: 'https://rawgit.com/moment/moment/2.2.1/min/moment.min.js',
            scriptId: 'moment-sample-script',
            onloadMethod: runOnloadMethod(), //the onLoadMethod is just an alert of the current time formated.
            condition: isViewMode, // in this example we are using modeView as condition for testing purposes, but you can use any condition as boolean.
          }}
        />
      ) : null}
      {/* To test the Inline Script go to view mode and check the console in devtools, you will get the log coming from getInlineScript() */}
      {isViewMode ? <Script mode={mode.type} dependencies={[]} inlineScript={getInlineScript()} /> : null}
    </>
  );
};

const textAlignLabel = 'Settings';

export default WithStyles(
  WithControls(HelloWorld, [
    {
      // You can define your own control
      id: 'settings-control',
      label: textAlignLabel,
      Button: (props) => <OptionsControlButton label={textAlignLabel} {...props} />,
      Panel,
    },
    'design-button', // And you can also pass the id of a registered control, in this case this is the id for "Design Settings"
  ]),
  'styles', // The object key where styles are applied from the Schema
  'button', // Optional: value from the styleguide to be applied for default styling
);
