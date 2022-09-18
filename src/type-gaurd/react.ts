import type {
  ReactNode,
  PropsWithChildren,
  ReactElement,
  FunctionComponent,
} from "react";
import { Fragment } from "react";

export function isHTMLElement(
  component: ReactNode
): component is ReactElement<PropsWithChildren> {
  return !!component && typeof component["type"] === "string";
}

export function isFragment(
  component: ReactNode
): component is ReactElement<PropsWithChildren> {
  return !!component && component["type"] === Fragment;
}

export function isReactElement(
  component: ReactNode
): component is ReactElement<PropsWithChildren, FunctionComponent> {
  return !!component && typeof component["type"] === "function";
}
