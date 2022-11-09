export type Props = {
  username: string;
  height: number;
  trackConversion: {
    trackingEnabled: boolean;
  };
};

export type InputProps = {
  value: number | string;
  setValue: (newVal: number | string) => void;
  label: string;
  placeholder?: string;
  type: 'number' | 'text';
};
