import type { ReactNode } from 'react';
import React, { Children } from 'react';
import { App } from './components';
import { isFragment, isHTMLElement, isReactElement } from './type-gaurd/react';
import { RendererBase, RenderSet } from './types';

function componentDepthFirstSearch(
  node: ReactNode,
  render?: RenderSet,
  depth = 0
) {
  const useRender = <T,>(renderer?: RendererBase<T>) =>
    renderer ?? render?.default;
  const nextDepth = depth + 1;

  // Falsy value
  // 타는 경우가 없는 것 같기도?
  if (node === undefined || node === null || typeof node === 'boolean') {
    useRender(render?.falsy)?.(
      {
        node,
        name: typeof node,
        props: {},
      },
      nextDepth
    );
    return;
  }

  // Primitive literal
  if (typeof node === 'string' || typeof node === 'number') {
    useRender(render?.primitive)?.(
      {
        node,
        name: typeof node,
        props: {},
      },
      nextDepth
    );
    return;
  }

  // HTMLElement
  if (isHTMLElement(node)) {
    useRender(render?.html)?.(
      {
        node,
        name: node.type.toString(),
        props: node.props,
      },
      depth
    );
    Children.toArray(node.props.children).forEach((child) =>
      componentDepthFirstSearch(child, render, nextDepth)
    );
    return;
  }

  // Fragment
  if (isFragment(node)) {
    useRender(render?.fragment)?.(
      {
        node,
        name: 'Fragment',
        props: node.props,
      },
      depth
    );
    Children.toArray(node.props.children).forEach((child) =>
      componentDepthFirstSearch(child, render, nextDepth)
    );
    return;
  }

  // Custom Component
  if (isReactElement(node)) {
    useRender(render?.component)?.(
      {
        node,
        name: node.type.name,
        props: node.props,
      },
      depth
    );
    componentDepthFirstSearch(node.type(node.props), render, nextDepth);
    return;
  }
}

const consoleRenderer: RenderSet = {
  default: (node, depth) => {
    console.log('  '.repeat(depth) + node.name);
  },
};

componentDepthFirstSearch(<App />, consoleRenderer);
