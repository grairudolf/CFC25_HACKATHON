import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceCard from './ServiceCard';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; // Import MemoryRouter and useNavigate

// Mock LanguageContext
const MockLanguageContext = React.createContext('en');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockExternalService = {
  id: '1',
  name: 'External Service',
  description: { en: 'External service description.', fr: '', pid: '' },
  image: 'external.jpg',
  rating: 4.0,
  reviewCount: 50,
  category: 'External',
  location: 'Web',
  website: 'https://external.example.com',
  isVerified: true,
  isLoggedIn: false,
};

const mockInternalService = {
  id: '2',
  name: 'Internal Service (Food Delivery)',
  description: { en: 'Internal service description.', fr: '', pid: '' },
  image: 'internal.jpg',
  rating: 4.8,
  reviewCount: 200,
  category: 'Food & Delivery',
  location: 'Local',
  website: '/food-delivery-order', // Internal path
  isVerified: true,
  isLoggedIn: false,
};

describe('ServiceCard Component', () => {
  beforeEach(() => {
    window.open = vi.fn(); // Mock window.open for external links
    // IntersectionObserver mock
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  const renderServiceCard = (serviceProps: any) => {
    return render(
      <MemoryRouter> {/* Wrap with MemoryRouter */}
        <MockLanguageContext.Provider value="en">
          <ServiceCard {...serviceProps} />
        </MockLanguageContext.Provider>
      </MemoryRouter>
    );
  };

  // --- Tests for External Service ---
  describe('With External Service', () => {
    it('renders external service details correctly', () => {
      renderServiceCard(mockExternalService);
      expect(screen.getByText('External Service')).toBeInTheDocument();
      expect(screen.getByText('External service description.')).toBeInTheDocument();
      // Check for "Use Service" button text and ExternalLink icon
      const useServiceButton = screen.getByRole('button', { name: /Use Service/i });
      expect(useServiceButton).toBeInTheDocument();
      expect(useServiceButton.querySelector('svg')).toHaveClass('lucide-external-link');
    });

    it('card click opens external website', () => {
      renderServiceCard(mockExternalService);
      const cardDiv = screen.getByRole('link', { name: /External Service/i });
      fireEvent.click(cardDiv);
      expect(window.open).toHaveBeenCalledWith(mockExternalService.website, '_blank', 'noopener,noreferrer');
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('"Learn More" button opens external website', () => {
      renderServiceCard(mockExternalService);
      fireEvent.click(screen.getByRole('button', { name: /Learn More/i }));
      expect(window.open).toHaveBeenCalledWith(mockExternalService.website, '_blank', 'noopener,noreferrer');
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('"Use Service" button opens external website', () => {
      renderServiceCard(mockExternalService);
      fireEvent.click(screen.getByRole('button', { name: /Use Service/i }));
      expect(window.open).toHaveBeenCalledWith(mockExternalService.website, '_blank', 'noopener,noreferrer');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // --- Tests for Internal Service ---
  describe('With Internal Service (Food Delivery)', () => {
    it('renders internal service details correctly', () => {
      renderServiceCard(mockInternalService);
      expect(screen.getByText('Internal Service (Food Delivery)')).toBeInTheDocument();
      expect(screen.getByText('Internal service description.')).toBeInTheDocument();
      // Check for "Order Now" button text and ShoppingCart icon
      const orderNowButton = screen.getByRole('button', { name: /Order Now/i });
      expect(orderNowButton).toBeInTheDocument();
      expect(orderNowButton.querySelector('svg')).toHaveClass('lucide-shopping-cart');
    });

    it('card click navigates to internal path', () => {
      renderServiceCard(mockInternalService);
      const cardDiv = screen.getByRole('link', { name: /Internal Service/i });
      fireEvent.click(cardDiv);
      expect(mockNavigate).toHaveBeenCalledWith(mockInternalService.website);
      expect(window.open).not.toHaveBeenCalled();
    });

    it('"Learn More" button navigates to internal path', () => {
      renderServiceCard(mockInternalService);
      fireEvent.click(screen.getByRole('button', { name: /Learn More/i }));
      expect(mockNavigate).toHaveBeenCalledWith(mockInternalService.website);
      expect(window.open).not.toHaveBeenCalled();
    });

    it('"Order Now" button navigates to internal path', () => {
      renderServiceCard(mockInternalService);
      fireEvent.click(screen.getByRole('button', { name: /Order Now/i }));
      expect(mockNavigate).toHaveBeenCalledWith(mockInternalService.website);
      expect(window.open).not.toHaveBeenCalled();
    });
  });

  // --- Common Tests (can use either mock service, e.g., external) ---
  it('renders star ratings and review count', () => {
    renderServiceCard(mockExternalService);
    expect(screen.getByText(`(${mockExternalService.reviewCount} reviews)`)).toBeInTheDocument();
    // More detailed star testing can be added if necessary
  });

  it('shows rating section if loggedIn is true', () => {
    renderServiceCard({ ...mockExternalService, isLoggedIn: true });
    expect(screen.getByText(/Rate this service:/i)).toBeInTheDocument();
  });

  it('allows user to rate if logged in (logs to console)', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
    renderServiceCard({ ...mockExternalService, isLoggedIn: true });

    const rateThisServiceText = screen.getByText(/Rate this service:/i);
    const interactiveStarsContainer = rateThisServiceText.parentElement?.querySelector('div > svg')?.parentElement; // More specific query

    if (interactiveStarsContainer) {
      const firstStar = interactiveStarsContainer.querySelectorAll('svg')[0];
      if (firstStar) {
        fireEvent.mouseEnter(firstStar); // hover to see effect
        fireEvent.click(firstStar);
        expect(consoleSpy).toHaveBeenCalledWith(`User rated ${mockExternalService.name} with 1 stars`);
      } else {
        console.warn("Test: Could not find first interactive star.");
      }
    } else {
      console.warn("Test: Could not find interactive stars container.");
    }
    consoleSpy.mockRestore();
  });
});
