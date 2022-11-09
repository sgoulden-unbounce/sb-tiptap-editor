import { colors, fontSize, spacing, Toggle } from 'smart-builder-sdk';
import styled from 'styled-components';

export const Wrapper = styled.div<{ configured: boolean; customHeight: number }>`
  ${({ configured, customHeight }) =>
    configured
      ? `
  width: 100%;
  height: ${customHeight ? `${customHeight}px` : '580px'};`
      : 'height: 100%'}
`;

export const EmptyState = styled.div`
  background: #ededed;
  display: grid;
  justify-content: center;
  padding: 30px;
  text-align: center;
  width: 100%;
`;

export const StyledImage = styled.img`
  max-height: 100px;
  max-width: 70%;
  margin: auto;
  padding-bottom: 15px;
`;

export const EmptyActions = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 5px;
`;

export const Container = styled.div`
  display: grid;
  grid-gap: 16px;
`;

export const StyledInputContainer = styled.div`
  max-width: 60%;
  display: flex;
  align-items: end;
  color: #303030;
`;

export const StyledLabelConversion = styled.label`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  font: 400 16px Source Sans Pro;
  color: #303030;
`;

export const StyledToggle = styled(Toggle)`
  transform: scale(0.75);
`;

export const StyledInputLabelWithTooltipWrapper = styled.div`
  display: flex;
  margin-bottom: -16px;
  font-size: 14px;
  color: #808080;
  span {
    z-index: 13;
    width: 16px;
  }
`;

export const Error = styled.p`
  margin-top: ${spacing.xs};
  color: ${colors.radicalRed};
  font-size: ${fontSize.iconText};
  margin-bottom: 0px;
  overflow-wrap: anywhere;
`;
