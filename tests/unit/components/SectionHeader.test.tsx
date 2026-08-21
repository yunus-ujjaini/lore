import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from '../../../src/components/SectionHeader';

describe('SectionHeader', () => {
  it('renders chapter number', () => {
    render(<SectionHeader index={0} title="The Commission" />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  it('renders section title', () => {
    render(<SectionHeader index={1} title="The Creature" />);
    expect(screen.getByText('The Creature')).toBeInTheDocument();
  });

  it('converts index to correct chapter number', () => {
    render(<SectionHeader index={2} title="Test" />);
    expect(screen.getByText('Chapter 3')).toBeInTheDocument();
  });

  it('applies active style when isActive is true', () => {
    const { container } = render(<SectionHeader index={0} title="Test" isActive />);
    const chapterLabel = container.querySelector('p');
    expect(chapterLabel).toHaveStyle({ color: '#b8852a' });
  });
});
