import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StoryEnding from '../../../src/components/StoryEnding';

describe('StoryEnding', () => {
  it('renders medallion divider with end-of-tale text', () => {
    const { container } = render(<StoryEnding />);
    expect(container.querySelector('.medallion-divider')).toBeInTheDocument();
  });

  it('renders End of Tale label', () => {
    const { getByText } = render(<StoryEnding />);
    expect(getByText(/End of Tale/)).toBeInTheDocument();
  });
});
