import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DropCap from '../../../src/components/DropCap';

describe('DropCap', () => {
  it('wraps children in a div with drop-cap class', () => {
    render(
      <DropCap>
        <p>First paragraph of the section.</p>
      </DropCap>
    );
    const wrapper = screen.getByText('First paragraph of the section.').closest('.drop-cap');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies drop-cap class to trigger ::first-letter CSS', () => {
    render(
      <DropCap>
        <p>Test content</p>
      </DropCap>
    );
    const wrapper = screen.getByText('Test content').closest('div');
    expect(wrapper).toHaveClass('drop-cap');
  });

  it('renders children correctly', () => {
    render(
      <DropCap>
        <p>Paragraph one</p>
        <p>Paragraph two</p>
      </DropCap>
    );
    expect(screen.getByText('Paragraph one')).toBeInTheDocument();
    expect(screen.getByText('Paragraph two')).toBeInTheDocument();
  });
});
