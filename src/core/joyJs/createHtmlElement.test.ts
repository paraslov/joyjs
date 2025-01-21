import { describe, it, expect, vi } from 'vitest';
import { createHtmlElement } from './createHtmlElement.ts';

describe('createHtmlElement', () => {
  it('should create an element with the specified tag', () => {
    const div = createHtmlElement('div');
    expect(div).toBeInstanceOf(HTMLElement);
    expect(div.tagName.toLowerCase()).toBe('div');
  });

  it('should set attributes', () => {
    const button = createHtmlElement('button', { id: 'test-button', type: 'submit' });
    expect(button.getAttribute('id')).toBe('test-button');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should append child elements', () => {
    const span = document.createElement('span');
    span.textContent = 'Hello';
    const div = createHtmlElement('div', { children: ['Text', span] });

    expect(div.childNodes.length).toBe(2);
    expect(div.childNodes[0].textContent).toBe('Text');
    expect(div.childNodes[1]).toBe(span);
  });

  it('should add event listeners', () => {
    const handleClick = vi.fn();
    const button = createHtmlElement('button', { onClick: handleClick });

    button.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('should set special properties for input elements', () => {
    const input = createHtmlElement('input', { type: 'checkbox', checked: true, value: 'test' });
    expect((input as HTMLInputElement).checked).toBe(true);
    expect((input as HTMLInputElement).value).toBe('test');
  });

  it('should correctly set the disabled property', () => {
    const button = createHtmlElement('button', { disabled: true });
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
});
