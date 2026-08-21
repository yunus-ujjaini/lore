import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StoryEnding from '../../../src/components/StoryEnding';

describe('StoryEnding', () => {
  it('renders a div with story-ending class', () => {
    const { container } = render(<StoryEnding />);
    expect(container.querySelector('.story-ending')).toBeInTheDocument();
  });

  it('renders an ornamental divider', () => {
    const { container } = render(<StoryEnding />);
    expect(container.querySelector('.story-ending__divider')).toBeInTheDocument();
  });
});
