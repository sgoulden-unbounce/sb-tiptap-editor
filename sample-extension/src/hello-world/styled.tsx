import { Toggle } from 'smart-builder-sdk';
import styled from 'styled-components';

export const Text = styled.div`
  text-align: center;
  line-height: 58px;
  letter-spacing: 0px;
  color: #202020;
`;

export const Wrapper = styled.div`
  display: grid;
`;

export const EmptyState = styled.div`
  background: #ededed;
  display: grid;
  justify-content: center;
  grid-gap: 20px;
  padding: 30px;
  text-align: center;
  width: 100%;
`;

export const StyledImg = styled.img`
  max-height: 100px;
  max-width: 50%;
  margin: auto;
`;

export const EmptyActions = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 5px;
`;

export const CloseButton = styled.button`
  align-items: center;
  background: #252525;
  border: none;
  color: #fff;
  display: flex;
  font-size: 30px;
  height: 50px;
  justify-content: center;
  line-height: 30px;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
`;

export const Modal = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  left: 50%;
  padding: 30px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  z-index: 23;
`;

export const Overlay = styled.div`
  background: #000;
  bottom: 0;
  left: 0;
  opacity: 0.3;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 22;
`;

export const StyledLabelConversion = styled.label`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  line-height: 20.11px;
  font: 400 16px 'Source Sans Pro';
  color: #303030;
`;

export const StyledToggle = styled(Toggle)`
  transform: scale(0.5);
  margin-right: -15px;
`;

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
