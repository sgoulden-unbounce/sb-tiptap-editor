import React from 'react';
import { InputField } from 'smart-builder-sdk';
import styled from 'styled-components';

import { InputProps } from '../types';

export const Input = ({ value, setValue, type, label, placeholder }: InputProps) => {
  return (
    <InputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledField
        placeholder={placeholder || ''}
        minimal
        type={type}
        value={value as string}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
        min={0}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: grid;
`;

const StyledField = styled(InputField)`
  ::placeholder {
    color: #c9c9c9;
  }
  width: '100%';
  font-size: 20px;
  margin-right: 1px;
  padding: 0;
  font-weight: 500;
  color: #303030;
  border-bottom: 1px solid #d8d8d8;
`;

export const StyledLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #808080;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
`;
