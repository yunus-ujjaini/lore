import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NextTaleCard from '../../../src/components/NextTaleCard';

const mockStory = {
  id: 'the-striga-of-maribor',
  title: 'The Striga of Maribor',
  summary: 'A witcher breaks a curse.',
  monsterIds: ['striga'],
  image: 'striga-of-maribor.png',
};

describe('NextTaleCard', () => {
  it('renders story title', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    expect(screen.getByText('The Striga of Maribor')).toBeInTheDocument();
  });

  it('renders story summary', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    expect(screen.getByText('A witcher breaks a curse.')).toBeInTheDocument();
  });

  it('links to the story route', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    const link = screen.getByText('The Striga of Maribor').closest('a');
    expect(link).toHaveAttribute('href', '/lore/stories/the-striga-of-maribor');
  });

  it('renders "Next Tale" label', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    expect(screen.getByText('Next Tale')).toBeInTheDocument();
  });
});
