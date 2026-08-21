import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders "Next Tale" label', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    expect(screen.getByText('Next Tale')).toBeInTheDocument();
  });

  it('renders "Continue Reading" link text', () => {
    render(
      <MemoryRouter>
        <NextTaleCard story={mockStory} />
      </MemoryRouter>
    );
    expect(screen.getByText('Continue Reading →')).toBeInTheDocument();
  });
});
