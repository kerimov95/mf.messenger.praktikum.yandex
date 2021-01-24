import { Block } from './block.js'

export function render(query: string, block: Block): Element | null {
    const root: HTMLElement | null = document.querySelector(query);
    root?.appendChild(block.getContent());

    return root;
}