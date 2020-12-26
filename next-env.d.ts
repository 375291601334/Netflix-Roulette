/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.less' {
  let all: { [selector: string]: string };
  export = all;
}

declare module 'react-redux';
