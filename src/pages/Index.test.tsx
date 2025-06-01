import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from './Index'; // Adjust path as needed
import { MemoryRouter } from 'react-router-dom';
import { AuthContext, AuthContextType } from '@/contexts/AuthContext'; // Adjust path
import React from 'react';

// Mock child components to simplify testing Index.tsx's direct responsibilities (state management for search)
// We are interested in whether Index correctly passes props.

// Mock Navbar: We need its search input and form
vi.mock('@/components/Navbar', () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <nav data-testid="navbar">
      <input type="text" aria-label="Search services in Navbar" onChange={(e) => onSearch(e.target.value)} />
      {/* Simplified: actual Navbar has a form and submit button */}
    </nav>
  ),
}));

// Mock HeroSection: We need its search input and form
vi.mock('@/components/HeroSection', () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <section data-testid="hero-section">
      <input type="text" aria-label="Search services in HeroSection" onChange={(e) => onSearch(e.target.value)} />
    </section>
  ),
}));

// Mock ServiceSection: We need to see if it receives the searchQuery prop
vi.mock('@/components/ServiceSection', () => ({
  default: ({ searchQuery }: { searchQuery?: string }) => (
    <section data-testid="service-section">
      <p>Search Query: {searchQuery || 'None'}</p>
    </section>
  ),
}));

// Mock other sections to keep the test focused
vi.mock('@/components/SkillSection', () => ({ default: () => <div data-testid="skill-section">Skill Section</div> }));
vi.mock('@/components/ServiceSubmissionForm', () => ({ default: () => <div data-testid="service-submission-form">Service Submission Form</div> }));
vi.mock('@/components/Footer', () => ({ default: () => <footer data-testid="footer">Footer</footer> }));
vi.mock('@/components/AIAssistant', () => ({ default: () => <div data-testid="ai-assistant">AI Assistant</div> }));

const mockAuthContextValue: AuthContextType = {
  currentUser: null,
  login: vi.fn(),
  logout: vi.fn(),
  loading: false,
  isOauthRedirect: false,
};

describe('Index Page', () => {
  beforeEach(() => {
    // Reset mocks if necessary
    vi.clearAllMocks();
    // IntersectionObserver mock for animations (if any component inside Index uses it)
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock scrollIntoView as it's called in handleSearch
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>{ui}</MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('renders all main sections', () => {
    renderWithProviders(<Index />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('service-section')).toBeInTheDocument();
    expect(screen.getByTestId('skill-section')).toBeInTheDocument();
    expect(screen.getByTestId('service-submission-form')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('ai-assistant')).toBeInTheDocument();
  });

  it('updates ServiceSection searchQuery when Navbar search is used', () => {
    renderWithProviders(<Index />);

    const navbarSearchInput = screen.getByLabelText('Search services in Navbar');
    fireEvent.change(navbarSearchInput, { target: { value: 'test query from navbar' } });

    // Check if ServiceSection mock received the query
    expect(screen.getByText('Search Query: test query from navbar')).toBeInTheDocument();
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

  });

  it('updates ServiceSection searchQuery when HeroSection search is used', () => {
    renderWithProviders(<Index />);

    const heroSearchInput = screen.getByLabelText('Search services in HeroSection');
    fireEvent.change(heroSearchInput, { target: { value: 'test query from hero' } });

    // Check if ServiceSection mock received the query
    expect(screen.getByText('Search Query: test query from hero')).toBeInTheDocument();
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('initial searchQuery for ServiceSection is empty', () => {
    renderWithProviders(<Index />);
    expect(screen.getByText('Search Query: None')).toBeInTheDocument();
  });
});
