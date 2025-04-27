import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../pages/HomePage';
import { fetchMostPopularArticles } from '../api/nytimes';


vi.mock('../api/nytimes', async () => {
  const actual = await vi.importActual('../api/nytimes');
  return {
    ...actual,
    fetchMostPopularArticles: vi.fn(),
  };
});

describe('HomePage', () => {
  it('renders articles after fetching', async () => {
    fetchMostPopularArticles.mockResolvedValueOnce([
      { id: 1, title: 'Test Article', abstract: 'Test Abstract', byline: 'By Tester', published_date: '2024-04-01', media: [] },
    ]);

    render(<HomePage />);

    expect(screen.getByText(/loading articles/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
    });
  });
});
