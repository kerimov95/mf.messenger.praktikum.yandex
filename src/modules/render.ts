import {Block, IBlockProps} from './block';

export function render(query: string,
    block: Block<IBlockProps>): Element | null {
  const root: HTMLElement | null = document.querySelector(query);
  root?.appendChild(block.getContent());

  return root;
}
