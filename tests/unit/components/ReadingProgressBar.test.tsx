import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  useScroll: vi.fn(() => ({
    scrollYProgress: { get: () => 0 },
  })),
  useSpring: vi.fn((val: number) => val),
  useReducedMotion: vi.fn(() => false),
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

import ReadingProgressBar from '../../../src/components/ReadingProgressBar';

describe('ReadingProgressBar', () => {
  it('renders with progress-bar class', () => {
    const { container } = render(<ReadingProgressBar />);
    expect(container.querySelector('.progress-bar')).toBeInTheDocument();
  });

  it('has role="progressbar" for accessibility', () => {
    render(<ReadingProgressBar />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<ReadingProgressBar />);
    expect(screen.getByLabelText('Reading progress')).toBeInTheDocument();
  });
});
