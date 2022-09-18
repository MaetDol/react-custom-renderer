import React, { Children, PropsWithChildren, ReactNode } from "react";
import { App } from "./components";

function isHTMLElement(
  component: ReactNode
): component is React.ReactElement<PropsWithChildren> {
  return !!component && typeof component["type"] === "string";
}

function isFragment(
  component: ReactNode
): component is React.ReactElement<PropsWithChildren> {
  return !!component && component["type"] === React.Fragment;
}

function isReactElement(
  component: ReactNode
): component is React.ReactElement<PropsWithChildren, React.FunctionComponent> {
  return !!component && typeof component["type"] === "function";
}

function render(node: ReactNode, indent = "") {
  const indented = indent + "  ";

  // Falsy value
  if (node === null) {
    console.log(`${indent}Um... falsy? ${node}`);
    return;
  }

  // Primitive literal
  if (typeof node === "string" || typeof node === "number") {
    console.log(`${indent}string - ${node}`);
    return;
  }

  // HTMLElement
  if (isHTMLElement(node)) {
    console.log(indent + node.type);
    Children.toArray(node.props.children).forEach((child) =>
      render(child, indented)
    );
    return;
  }

  // Fragment
  if (isFragment(node)) {
    console.log(indent + "Fragment");
    Children.toArray(node.props.children).forEach((child) =>
      render(child, indented)
    );
    return;
  }

  // Custom Component
  if (isReactElement(node)) {
    console.log(indent + node.type.name);
    render(node.type(node.props), indented);
    return;
  }
}

render(<App />);
