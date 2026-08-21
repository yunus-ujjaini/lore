import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../../src/components/FilterBar', () => ({
  CATEGORY_COLORS: { Necrophages: '#3a5a1a', Specters: '#1a2a5a' },
}));

import RelatedMonsters from '../../../src/components/RelatedMonsters';

const mockMonsters = [
  { id: 'alghoul', name: 'Alghoul', category: 'Necrophages', threatLevel: 2, description: 'Test', image: 'test.png' },
  { id: 'wraith', name: 'Wraith', category: 'Specters', threatLevel: 2, description: 'Test', image: 'test.png' },
];

describe('RelatedMonsters', () => {
  it('renders "Monsters Encountered" heading', () => {
    render(<RelatedMonsters monsters={mockMonsters} onMonsterClick={vi.fn()} />);
    expect(screen.getByText('Monsters Encountered')).toBeInTheDocument();
  });

  it('renders monster names', () => {
    render(<RelatedMonsters monsters={mockMonsters} onMonsterClick={vi.fn()} />);
    expect(screen.getByText('Alghoul')).toBeInTheDocument();
    expect(screen.getByText('Wraith')).toBeInTheDocument();
  });

  it('returns null when no monsters', () => {
    const { container } = render(<RelatedMonsters monsters={[]} onMonsterClick={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });
});
