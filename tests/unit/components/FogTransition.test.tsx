import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FogTransition from '../../../src/components/FogTransition';

describe('FogTransition', () => {
  it('renders a div with fog-transition class', () => {
    const { container } = render(<FogTransition />);
    expect(container.querySelector('.fog-transition')).toBeInTheDocument();
  });

  it('renders an empty div (decorative element)', () => {
    const { container } = render(<FogTransition />);
    const el = container.querySelector('.fog-transition');
    expect(el).toBeInTheDocument();
    expect(el?.children.length).toBe(0);
  });
});
