import React, { useState } from 'react';

import { Modal, CloseButton, Overlay } from '../styled';
import { Props } from '../types';

export const ChangeFullNameModal = ({ fullname, onUpdate, onClose }: Props) => {
  const [localFullname, setLocalFullname] = useState(fullname);
  return (
    <>
      <Modal>
        <CloseButton onClick={onClose}>x</CloseButton>
        <label>
          <strong>Full Name:</strong>
          <br />
          <input
            type="text"
            data-testid="hello-world-first-name-input"
            value={localFullname}
            onChange={({ currentTarget: { value } }) => setLocalFullname(value)}
          />
        </label>
        <br />
        <button data-testid="hello-world-save-btn" onClick={() => onUpdate(localFullname)}>
          Save
        </button>
      </Modal>
      <Overlay />
    </>
  );
};
