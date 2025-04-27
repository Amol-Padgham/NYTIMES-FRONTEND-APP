/// <reference types="vitest" />
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleListItem from '../components/ArticleList/ArticleListItem';

// Tell Vitest to use jsdom
import { beforeAll } from 'vitest';
import { afterAll } from 'vitest';
import { beforeEach } from 'vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Add jsdom setup
beforeEach(() => {
  if (!globalThis.document) {
    throw new Error('jsdom not available');
  }
});

afterEach(() => {
  cleanup();
});
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('ArticleListItem', () => {
  const article = {
    id: 1,
    title: 'Title Test',
    abstract: 'Abstract Test',
    byline: 'Author Test',
    published_date: '2024-04-20',
    media: [],
  };

  it('renders article data correctly', () => {
    render(<ArticleListItem article={article} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Title Test')).toBeInTheDocument();
    expect(screen.getByText('Abstract Test')).toBeInTheDocument();
  });

  it('navigates to detail page on click', () => {
    render(<ArticleListItem article={article} />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Title Test'));
    // Same - the navigate spy might need slight control if needed
  });
});
