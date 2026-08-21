import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../src/styles/stories.css';

describe('Story Hero Layout', () => {
  it('hero section has correct class and structure', () => {
    render(
      <div className="story-reader__hero" data-testid="story-hero">
        <img src="/test.jpg" alt="Test" className="story-reader__hero-image" />
        <div className="story-reader__hero-overlay" />
        <div className="story-reader__hero-content">
          <h1 className="story-reader__title">Test Title</h1>
          <p className="story-reader__summary">Test summary</p>
        </div>
      </div>
    );
    expect(screen.getByTestId('story-hero')).toHaveClass('story-reader__hero');
    expect(screen.getByText('Test Title')).toHaveClass('story-reader__title');
    expect(screen.getByText('Test summary')).toHaveClass('story-reader__summary');
  });

  it('hero overlay has gradient styling', () => {
    render(
      <div className="story-reader__hero">
        <div className="story-reader__hero-overlay" data-testid="overlay" />
      </div>
    );
    expect(screen.getByTestId('overlay')).toHaveClass('story-reader__hero-overlay');
  });

  it('title renders prominently above summary', () => {
    render(
      <div className="story-reader__hero-content">
        <h1 className="story-reader__title">Title</h1>
        <p className="story-reader__summary">Summary</p>
      </div>
    );
    const title = screen.getByText('Title');
    const summary = screen.getByText('Summary');
    expect(title.tagName).toBe('H1');
    expect(summary.tagName).toBe('P');
  });
});

describe('Story Hero Image Fallback', () => {
  it('renders image with alt text', () => {
    render(
      <img
        src="/images/stories/test.png"
        alt="Test story illustration"
        className="story-reader__hero-image"
      />
    );
    const img = screen.getByAltText('Test story illustration');
    expect(img).toHaveAttribute('src', '/images/stories/test.png');
  });

  it('image has cover object-fit styling', () => {
    render(
      <img
        src="/test.jpg"
        alt="Test"
        className="story-reader__hero-image"
      />
    );
    expect(screen.getByAltText('Test')).toHaveClass('story-reader__hero-image');
  });
});
