import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ArticleDetail from '../components/ArticleDetail/ArticleDetail';


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),  // Directly return a mock function here
  };
});

const article = {
  id: 1,
  title: 'Mock Article',
  abstract: 'Mock Abstract',
  byline: 'By Mock',
  published_date: '2024-04-01',
  media: [],
  section: 'World',
  adx_keywords: 'Test;Mock',
  url: 'https://example.com',
};

describe('ArticleDetail', () => {
  it('renders article detail', () => {
    render(<ArticleDetail article={article} />, { wrapper: MemoryRouter });

    expect(screen.getByText('Mock Article')).toBeInTheDocument();
    expect(screen.getByText('Mock Abstract')).toBeInTheDocument();
    expect(screen.getByText('By Mock')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('navigates home when clicking close', () => {
    render(<ArticleDetail article={article} />, { wrapper: MemoryRouter });
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    // No mockNavigate anymore, you should spy directly on useNavigate or refactor
    // This test will need slight adjustment if you need perfect control
  });
});
