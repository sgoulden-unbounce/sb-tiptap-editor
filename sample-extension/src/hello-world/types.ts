export interface Props {
  fullname: string;
  onUpdate: (newFirstName: string) => void;
  onClose: () => void;
}
