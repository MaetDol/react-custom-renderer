import type {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

export type NodeInfo<T> = {
  node: T;
  name: string;
  props: PropsWithChildren;
};

export type RendererBase<T> = (node: NodeInfo<T>, depth: number) => void;

export type RenderSet = Partial<{
  default: RendererBase<ReactNode>;
  falsy: RendererBase<undefined | null | boolean>;
  primitive: RendererBase<string | number>;
  html: RendererBase<ReactElement<PropsWithChildren>>;
  fragment: RendererBase<ReactElement<PropsWithChildren>>;
  component: RendererBase<ReactElement<PropsWithChildren, FunctionComponent>>;
}>;
