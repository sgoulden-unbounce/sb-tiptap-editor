import type { Ub } from 'smart-builder-sdk';

declare global {
  interface ExtendedWindow {
    ub: Ub & {
      section: any;
      registerComponent: (appBundle: any) => void;
      registerSection: (appBundle: any) => void;
      registerControl: (appControl: any) => void;
      registerHook: (appHook: any) => void;
    };
  }
}

export const {
  Schema,
  component,
  section,
  registerComponent,
  registerSection,
  registerControl,
  registerHook,
  useRegisteredEntitiesByPath,
  WithStyles,
} = (window as unknown as ExtendedWindow)['ub'];
export default (window as unknown as ExtendedWindow)['ub'];
