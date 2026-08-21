import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...rest } = props;
      return <section {...rest}>{children}</section>;
    },
  },
}));

import RelatedMonsters from '../../../src/components/RelatedMonsters';

const mockMonsters = [
  { id: 'alghoul', name: 'Alghoul', category: 'Necrophages', threatLevel: 2, description: 'Test', image: 'test.png' },
  { id: 'wraith', name: 'Wraith', category: 'Specters', threatLevel: 2, description: 'Test', image: 'test.png' },
];

describe('RelatedMonsters', () => {
  it('renders "Monsters of this Tale" heading', () => {
    render(<RelatedMonsters monsters={mockMonsters} onMonsterClick={vi.fn()} />);
    expect(screen.getByText('Monsters of this Tale')).toBeInTheDocument();
  });

  it('renders monster cards', () => {
    render(<RelatedMonsters monsters={mockMonsters} onMonsterClick={vi.fn()} />);
    expect(screen.getByText('Alghoul')).toBeInTheDocument();
    expect(screen.getByText('Wraith')).toBeInTheDocument();
  });

  it('returns null when no monsters', () => {
    const { container } = render(<RelatedMonsters monsters={[]} onMonsterClick={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });
});
