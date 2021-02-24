import {Block} from './block';

export function render(query: string, block: Block): Element | null {
  const root: HTMLElement | null = document.querySelector(query);
  root?.appendChild(block.getContent());

  return root;
}
