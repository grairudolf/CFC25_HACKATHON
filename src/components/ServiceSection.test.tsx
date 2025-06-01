import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ServiceSection from './ServiceSection';
import React from 'react';
import * as ReactModule from 'react'; // Import React module to mock useMemo

// Mock ServiceCard
vi.mock('./ServiceCard', () => ({
  __esModule: true,
  __esModule: true,
  default: ({ name, description }: { name: string, description: { en: string } }) => (
    <div data-testid="service-card">
      <h3>{name}</h3>
      <p>{description.en}</p>
    </div>
  ),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock data to be returned by useMemo
const mockServicesData = {
  recommended: [
    { id: "r1", name: "RecService1", description: { en: "RecDesc1", fr: "", pid: "" }, category: "CatA", image: "", rating: 5, reviewCount: 10, location: "LocA" },
    { id: "r2", name: "RecService2", description: { en: "RecDesc2", fr: "", pid: "" }, category: "CatB", image: "", rating: 4, reviewCount: 5, location: "LocB" },
    { id: "r3", name: "RecService3", description: { en: "RecDesc3", fr: "", pid: "" }, category: "CatA", image: "", rating: 3, reviewCount: 2, location: "LocA" },
    { id: "r4", name: "RecService4", description: { en: "RecDesc4", fr: "", pid: "" }, category: "CatC", image: "", rating: 5, reviewCount: 100, location: "LocC" },
    { id: "r5", name: "RecService5", description: { en: "RecDesc5", fr: "", pid: "" }, category: "CatB", image: "", rating: 4, reviewCount: 50, location: "LocB" },
  ],
  latest: [ // Fewer services for testing category change resets
    { id: "l1", name: "LatestService1", description: { en: "LatestDesc1", fr: "", pid: "" }, category: "CatD", image: "", rating: 5, reviewCount: 10, location: "LocD" },
    { id: "l2", name: "LatestService2", description: { en: "LatestDesc2", fr: "", pid: "" }, category: "CatD", image: "", rating: 4, reviewCount: 5, location: "LocD" },
  ],
  // Add other categories if your component uses them by default or for other tests
};

const mockDefaultServicesData = {
  recommended: [
    { id: "1", name: "FastChops", description: { en: "Fast food delivery...", fr: "", pid: "" }, category: "Food & Delivery", image: "", rating: 4.8, reviewCount: 1247, location: "Buea" },
    { id: "2", name: "237Jobs", description: { en: "Cameroon's #1 job platform...", fr: "", pid: "" }, category: "Jobs & Career", image: "", rating: 4.7, reviewCount: 892, location: "All Cameroon" },
    { id: "3", name: "Nkwa", description: { en: "Mobile payment solutions...", fr: "", pid: "" }, category: "Fintech & Payments", image: "", rating: 4.9, reviewCount: 2156, location: "National" },
  ],
  latest: [
    { id: "4", name: "DelTechHub", description: { en: "Technology training...", fr: "", pid: "" }, category: "Tech Training", image: "", rating: 4.6, reviewCount: 343, location: "Douala" },
    { id: "5", name: "AjeBoCV", description: { en: "Create your professional CV...", fr: "", pid: "" }, category: "Professional Services", image: "", rating: 4.5, reviewCount: 567, location: "Online" },
    { id: "6", name: "skolarr", description: { en: "Cameroonian digital library...", fr: "", pid: "" }, category: "Education", image: "", rating: 4.7, reviewCount: 778, location: "Online" },
  ],
};


describe('ServiceSection Component', () => {
  let useMemoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock for useMemo to return the original data structure for most tests
    useMemoSpy = vi.spyOn(ReactModule, 'useMemo').mockImplementation(callback => callback());
  });

  afterEach(() => {
    useMemoSpy.mockRestore();
  });

  // Helper to set up useMemo mock for specific data
  const setupMockData = (data: any) => {
    useMemoSpy.mockImplementation((callback, deps) => {
      // Assuming the first useMemo call in the component is for allServicesData
      if (callback.toString().includes("allServicesData")) { // A bit brittle, depends on implementation detail
        return data;
      }
      // For other useMemo calls (like uniqueCategories), let them compute based on the mocked data
      // or provide a more specific mock if needed. This simplified version recomputes.
      if (Array.isArray(deps) && deps[0] === data) { // This targets uniqueCategories
         const categories = new Set<string>();
         Object.values(data as any).forEach((tabServices: any) => {
           tabServices.forEach((service: any) => categories.add(service.category));
         });
         return ["all", ...Array.from(categories).sort()];
      }
      return callback(); // Fallback for any other useMemo calls
    });
  };


  it('renders correctly with initial (default) services', () => {
    setupMockData(mockDefaultServicesData);
    render(<ServiceSection />);
    expect(screen.getByText('Quality Cameroonian Services')).toBeInTheDocument();
    const serviceCards = screen.getAllByTestId('service-card');
    expect(serviceCards.length).toBe(3); // Default ITEMS_TO_LOAD_MORE
    expect(screen.getByText('FastChops')).toBeInTheDocument();
  });

  describe('Search Functionality (with default data)', () => {
    beforeEach(() => {
        setupMockData(mockDefaultServicesData);
    });
    it('filters services by search query (name)', () => {
      render(<ServiceSection searchQuery="FastChops" />);
      expect(screen.getAllByTestId('service-card').length).toBe(1);
      expect(screen.getByText('FastChops')).toBeInTheDocument();
    });
     it('shows "No services found" message for non-matching query', () => {
      render(<ServiceSection searchQuery="NonExistentService123" />);
      expect(screen.getByText('No services found')).toBeInTheDocument();
      expect(screen.queryAllByTestId('service-card').length).toBe(0);
    });
  });

  describe('Category Filtering (with default data)', () => {
    beforeEach(() => {
        setupMockData(mockDefaultServicesData);
    });
    it('filters services by selected category', async () => {
      render(<ServiceSection />);
      const selectTrigger = screen.getByRole('button', { name: /Category/i }); // Using regex for flexibility
      fireEvent.mouseDown(selectTrigger);
      const categoryItem = await screen.findByText('Fintech & Payments');
      fireEvent.click(categoryItem);
      expect(screen.getAllByTestId('service-card').length).toBe(1);
      expect(screen.getByText('Nkwa')).toBeInTheDocument();
    });
  });

  describe("'View More' / 'View Less' Button Functionality", () => {
    beforeEach(() => {
      // Use the extended mockServicesData for these tests
      setupMockData(mockServicesData);
    });

    it('appears when there are more services than initially visible and shows correct counts', () => {
      render(<ServiceSection />); // Recommended tab has 5 services in mockServicesData
      expect(screen.getAllByTestId('service-card').length).toBe(3); // Initial visible
      const viewMoreButton = screen.getByRole('button', { name: /View More/i });
      expect(viewMoreButton).toBeInTheDocument();
      expect(viewMoreButton.textContent).toMatch(/View More \(3\/5\)/);
    });

    it('displays all services on "View More" click and changes text to "View Less"', () => {
      render(<ServiceSection />);
      const viewMoreButton = screen.getByRole('button', { name: /View More \(3\/5\)/i });
      fireEvent.click(viewMoreButton);
      expect(screen.getAllByTestId('service-card').length).toBe(5);
      const viewLessButton = screen.getByRole('button', { name: /View Less \(5\/5\)/i });
      expect(viewLessButton).toBeInTheDocument();
    });

    it('reverts to initial view on "View Less" click and changes text to "View More"', () => {
      render(<ServiceSection />);
      fireEvent.click(screen.getByRole('button', { name: /View More \(3\/5\)/i })); // Show all
      fireEvent.click(screen.getByRole('button', { name: /View Less \(5\/5\)/i })); // Show less
      expect(screen.getAllByTestId('service-card').length).toBe(3);
      const viewMoreButton = screen.getByRole('button', { name: /View More \(3\/5\)/i });
      expect(viewMoreButton).toBeInTheDocument();
    });

    it('resets visibleCount and button to "View More" when searchQuery changes', () => {
      const { rerender } = render(<ServiceSection />);
      fireEvent.click(screen.getByRole('button', { name: /View More \(3\/5\)/i })); // Show all 5
      expect(screen.getAllByTestId('service-card').length).toBe(5);
      expect(screen.getByRole('button', { name: /View Less \(5\/5\)/i })).toBeInTheDocument();

      // Rerender with a search query that filters to 4 services (RecService1, RecService2, RecService3, RecService4 if searching "RecServ")
      // Our mock data for 'recommended' has RecService1-5. Searching "RecService" matches all 5.
      // Let's search for "CatA" which matches RecService1, RecService3 (2 services)
      // The button should not be visible as 2 < 3 (ITEMS_TO_LOAD_MORE)
      rerender(<ServiceSection searchQuery="CatA" />);
      expect(screen.getAllByTestId('service-card').length).toBe(2); // All matching services for "CatA"
      expect(screen.queryByRole('button', { name: /View More/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /View Less/i })).not.toBeInTheDocument();

      // Now search for something that matches 4 services: "RecServ" (but not RecService5 to test count)
      // Let's adjust mock data or search. If we search for "RecService" it matches all 5.
      // Let's assume a search for "Service" (generic) matches RecService1,2,3,4 (4 services).
      // We need to ensure our mock data and search query correctly simulate this.
      // For simplicity, let's use a query that reduces the total but still > ITEMS_TO_LOAD_MORE
      // Search for "RecService" - matches all 5.
      // The logic is: if filteredServices.length > ITEMS_TO_LOAD_MORE, show button.
      // visibleCount is reset to ITEMS_TO_LOAD_MORE.
      rerender(<ServiceSection searchQuery="RecServ" />); // Matches all 5 "RecService" items
      expect(screen.getAllByTestId('service-card').length).toBe(3); // Initial visible reset
      const viewMoreButton = screen.getByRole('button', { name: /View More \(3\/5\)/i });
      expect(viewMoreButton).toBeInTheDocument();
    });

    it('resets visibleCount and button state when selectedCategory changes', async () => {
      const { rerender } = render(<ServiceSection />); // Uses mockServicesData (recommended: 5 services)
      fireEvent.click(screen.getByRole('button', { name: /View More \(3\/5\)/i })); // Show all 5
      expect(screen.getByRole('button', { name: /View Less \(5\/5\)/i })).toBeInTheDocument();

      // Change category to "CatD" (has 2 services: LatestService1, LatestService2)
      const selectTrigger = screen.getByRole('button', { name: /Category/i });
      fireEvent.mouseDown(selectTrigger);
      const categoryItem = await screen.findByText('CatD'); // Make sure CatD is in uniqueCategories from mockServicesData
      fireEvent.click(categoryItem);

      await waitFor(() => {
        expect(screen.getAllByTestId('service-card').length).toBe(2); // All services for CatD
      });
      // "View More" button should not be visible as 2 < ITEMS_TO_LOAD_MORE
      expect(screen.queryByRole('button', { name: /View More/i })).not.toBeInTheDocument();

      // Change category back to "CatA" (has 2 services: RecService1, RecService3)
      fireEvent.mouseDown(selectTrigger);
      const categoryAItem = await screen.findByText('CatA');
      fireEvent.click(categoryAItem);

      await waitFor(() => {
        expect(screen.getAllByTestId('service-card').length).toBe(2);
      });
      expect(screen.queryByRole('button', { name: /View More/i })).not.toBeInTheDocument();

      // Change category to "CatC" (has 1 service: RecService4)
      // This test seems to be fighting with the activeTab state which defaults to "recommended"
      // The category filter applies *after* the activeTab filter.
      // So when we select "CatD", it filters within "recommended" services first.
      // This means we need to ensure our mockServicesData.recommended has these categories or change tab first.

      // Let's simplify: stay on "recommended" tab which has CatA, CatB, CatC.
      // Reset to initial state for clarity for this part of the test
      setupMockData(mockServicesData); // reset data
      render(<ServiceSection />); // Re-render
      fireEvent.click(screen.getByRole('button', { name: /View More \(3\/5\)/i })); // Expand

      // Select "CatB" (RecService2, RecService5 - 2 services)
      fireEvent.mouseDown(screen.getByRole('button', { name: /Category/i }));
      fireEvent.click(await screen.findByText('CatB'));
      await waitFor(() => {
        expect(screen.getAllByTestId('service-card').length).toBe(2); // Shows all 2 CatB services
      });
      expect(screen.queryByRole('button', { name: /View More/i })).not.toBeInTheDocument();

       // Select "CatC" (RecService4 - 1 service)
      fireEvent.mouseDown(screen.getByRole('button', { name: /Category/i }));
      fireEvent.click(await screen.findByText('CatC'));
      await waitFor(() => {
        expect(screen.getAllByTestId('service-card').length).toBe(1); // Shows the 1 CatC service
      });
      expect(screen.queryByRole('button', { name: /View More/i })).not.toBeInTheDocument();

      // Select "All Categories" again for the "recommended" tab (5 services total)
      fireEvent.mouseDown(screen.getByRole('button', { name: /Category/i }));
      fireEvent.click(await screen.findByText('All Categories'));
      await waitFor(() => { // Should reset to initial view for 5 services
        expect(screen.getAllByTestId('service-card').length).toBe(3);
      });
      expect(screen.getByRole('button', { name: /View More \(3\/5\)/i })).toBeInTheDocument();
    });
  });
});
