declare module '*.png';
declare module 'reactstrap';

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

declare interface ChangeLog {
  timestamp: string;
  username: string;
  delta: any;
}
