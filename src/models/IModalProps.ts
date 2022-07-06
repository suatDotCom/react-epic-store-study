export interface IModalProps<T> {
    isShowing: boolean;
    toggle: Function;
    data: T;
  };