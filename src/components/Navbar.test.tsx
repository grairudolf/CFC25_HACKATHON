import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For more realistic user interactions
import Navbar from './Navbar';
import { Service } from '@/types';
import React from 'react';

// Mock dependencies
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null, // Can be { name: 'Test User', email: 'test@example.com', picture: 'url' } for logged-in state
    logout: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>, // Basic Link mock
  };
});

const mockOnSearch = vi.fn();
const mockAllServices: Service[] = [
  { id: '1', name: 'Alpha Service', description: { en: 'Alpha desc', fr: '', pid: '' }, category: 'Tech', location: 'CityA', image: '', rating: 0, reviewCount: 0 },
  { id: '2', name: 'Beta Service', description: { en: 'Beta desc', fr: '', pid: '' }, category: 'Food', location: 'CityB', image: '', rating: 0, reviewCount: 0 },
  { id: '3', name: 'Gamma Tech', description: { en: 'Gamma desc', fr: '', pid: '' }, category: 'Tech', location: 'CityA', image: '', rating: 0, reviewCount: 0 },
  { id: '4', name: 'Delta Food', description: { en: 'Delta FOOD', fr: '', pid: '' }, category: 'Food', location: 'CityC', image: '', rating: 0, reviewCount: 0 },
  { id: '5', name: 'Epsilon Other', description: { en: 'Epsilon desc', fr: '', pid: '' }, category: 'Other', location: 'CityB', image: '', rating: 0, reviewCount: 0 },
];

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // IntersectionObserver mock for potential internal components if any
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const renderNavbar = (services = mockAllServices) => {
    return render(<Navbar onSearch={mockOnSearch} allServices={services} />);
  };

  it('renders the search input', () => {
    renderNavbar();
    expect(screen.getByPlaceholderText('Search services...')).toBeInTheDocument();
  });

  it('shows suggestions when user types a matching query', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'Alpha');

    await waitFor(() => {
      expect(screen.getByText('Alpha Service')).toBeInTheDocument();
    });
    // Check if only one suggestion is shown for "Alpha"
    const suggestions = screen.getAllByRole('listitem'); // Assuming suggestions are <li>
    expect(suggestions.length).toBe(1);
  });

  it('filters suggestions based on name, category, description, location', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Tech'); // Matches Alpha Service, Gamma Tech
    await waitFor(() => {
      expect(screen.getByText('Alpha Service')).toBeInTheDocument();
      expect(screen.getByText('Gamma Tech')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(2);
    });

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'CityA'); // Matches Alpha Service, Gamma Tech (by location)
     await waitFor(() => {
      expect(screen.getByText('Alpha Service')).toBeInTheDocument();
      expect(screen.getByText('Gamma Tech')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(2);
    });

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Beta desc'); // Matches Beta Service by description
    await waitFor(() => {
      expect(screen.getByText('Beta Service')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(1);
    });
  });

  it('shows no suggestions if query does not match', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'NonExistentQueryXYZ');

    await waitFor(() => {
      // The list itself might not be rendered, or it's empty
      expect(screen.queryByRole('list')).not.toBeInTheDocument(); // Check if the <ul> is absent
      // Or if the ul is always there but items are not:
      // expect(screen.queryAllByRole('listitem').length).toBe(0);
    });
  });

  it('clears suggestions when input is empty', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'Alpha');
    await waitFor(() => {
      expect(screen.getByText('Alpha Service')).toBeInTheDocument();
    });

    await userEvent.clear(searchInput);
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  it('calls onSearch and hides suggestions when a suggestion is clicked', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'Beta'); // Shows "Beta Service"

    let suggestionItem: HTMLElement;
    await waitFor(() => {
      suggestionItem = screen.getByText('Beta Service');
      expect(suggestionItem).toBeInTheDocument();
    });

    fireEvent.click(suggestionItem!); // Use fireEvent for direct click, userEvent can also be used

    expect(mockOnSearch).toHaveBeenCalledWith('Beta Service');
    expect(searchInput).toHaveValue('Beta Service');
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument(); // Suggestions hidden
    });
  });

  it('hides suggestions when clicking outside the search input and suggestions list', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'Gamma');

    await waitFor(() => {
      expect(screen.getByText('Gamma Tech')).toBeInTheDocument(); // Suggestions are visible
    });

    fireEvent.mouseDown(document.body); // Simulate click outside

    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument(); // Suggestions hidden
    });
  });

  it('submitting the form via Enter key calls onSearch and hides suggestions', async () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search services...');
    await userEvent.type(searchInput, 'Delta');
     await waitFor(() => {
      expect(screen.getByText('Delta Food')).toBeInTheDocument(); // Suggestions are visible
    });

    fireEvent.submit(searchInput); // Or screen.getByRole('form') if you have one explicitly

    expect(mockOnSearch).toHaveBeenCalledWith('Delta'); // Query at time of submit
     await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument(); // Suggestions hidden
    });
  });
});
