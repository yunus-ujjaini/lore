import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from '../../../src/components/SectionHeader';

describe('SectionHeader', () => {
  it('renders Roman numeral', () => {
    render(<SectionHeader index={0} title="The Commission" />);
    expect(screen.getByText('I')).toBeInTheDocument();
  });

  it('renders section title', () => {
    render(<SectionHeader index={1} title="The Creature" />);
    expect(screen.getByText('The Creature')).toBeInTheDocument();
  });

  it('renders ornamental divider', () => {
    const { container } = render(<SectionHeader index={0} title="Test" />);
    expect(container.querySelector('.section-header__divider')).toBeInTheDocument();
  });

  it('converts index to correct Roman numeral', () => {
    render(<SectionHeader index={2} title="Test" />);
    expect(screen.getByText('III')).toBeInTheDocument();
  });

  it('wraps content in section-header class', () => {
    const { container } = render(<SectionHeader index={0} title="Test" />);
    expect(container.querySelector('.section-header')).toBeInTheDocument();
  });
});
