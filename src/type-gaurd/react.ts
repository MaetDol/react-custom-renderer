import type {
  ReactNode,
  PropsWithChildren,
  ReactElement,
  FunctionComponent,
} from "react";
import { Fragment } from "react";

function getComponentType(comp: ReactNode) {
  if (comp === null) return "null";
  if (comp === undefined) return "undefined";
  if (typeof comp === "number") return "number";
  if (typeof comp === "string") return "string";
  if (typeof comp === "boolean") return "boolean";
  if (Symbol.iterator in comp) return "fragment";
  if (comp.type === Fragment) return "fragment";
  if (typeof comp.type === "string") return "html";
  if (typeof comp.type === "function") return "react";

  return "unknown";
}

export function isHTMLElement(
  component: ReactNode
): component is ReactElement<PropsWithChildren> {
  return getComponentType(component) === "html";
}

export function isFragment(
  component: ReactNode
): component is ReactElement<PropsWithChildren> {
  return getComponentType(component) === "fragment";
}

export function isReactElement(
  component: ReactNode
): component is ReactElement<PropsWithChildren, FunctionComponent> {
  return getComponentType(component) === "react";
}
