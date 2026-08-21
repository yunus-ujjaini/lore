import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../src/styles/stories.css';

describe('Reading Typography', () => {
  it('section text has comfortable font size', () => {
    render(
      <div className="story-content__section-text">
        <p>Test paragraph</p>
      </div>
    );
    const el = screen.getByText('Test paragraph').closest('.story-content__section-text');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('story-content__section-text');
  });

  it('story-content section has background styling', () => {
    render(
      <div className="story-content">
        <p>Content area</p>
      </div>
    );
    const el = screen.getByText('Content area').closest('.story-content');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('story-content');
  });

  it('section text renders paragraph content', () => {
    render(
      <div className="story-content__section-text">
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </div>
    );
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });
});
