import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HeroSection from './HeroSection'; // Adjust path as needed
import React from 'react';

// Mock the smoothScrollTo function if it's exported, or spy on window.scrollIntoView
// For this test, let's assume smoothScrollTo is an internal helper and spy on element.scrollIntoView

describe('HeroSection Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    // IntersectionObserver mock for animations
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders correctly with title, subtitle, and search bar', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    expect(screen.getByText(/Welcome to Silicon/i)).toBeInTheDocument(); // Part of English title
    expect(screen.getByText(/Connect with the best Cameroonian digital services/i)).toBeInTheDocument(); // Part of English subtitle
    expect(screen.getByPlaceholderText(/What are you looking for today?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore Services/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add My Service/i })).toBeInTheDocument();
  });

  it('calls onSearch when the search form is submitted', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/What are you looking for today?/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'find jobs' } });
    fireEvent.click(searchButton); // Simulate form submission by clicking button

    expect(mockOnSearch).toHaveBeenCalledWith('find jobs');
  });

  it('calls scrollIntoView for "Explore Services" button', () => {
    // Mock getElementById to return a dummy element
    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    // Spy on the method of the specific mockElement is better if possible,
    // but spying on prototype is fine for this case.
    // const scrollIntoViewSpy = vi.spyOn(mockElement, 'scrollIntoView'); // This would be ideal

    render(<HeroSection onSearch={mockOnSearch} />);
    const exploreButton = screen.getByRole('button', { name: /Explore Services/i });
    fireEvent.click(exploreButton);

    expect(document.getElementById).toHaveBeenCalledWith('services');
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    // if (scrollIntoViewSpy) expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('calls scrollIntoView for "Add My Service" button', () => {
    const mockElement = document.createElement('div');
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    // const scrollIntoViewSpy = vi.spyOn(mockElement, 'scrollIntoView');

    render(<HeroSection onSearch={mockOnSearch} />);
    const addServiceButton = screen.getByRole('button', { name: /Add My Service/i });
    fireEvent.click(addServiceButton);

    expect(document.getElementById).toHaveBeenCalledWith('submit');
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    // if (scrollIntoViewSpy) expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('shows AI suggestions on search input focus', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/What are you looking for today?/i);
    fireEvent.focus(searchInput);
    expect(screen.getByText(/AI suggestions for you/i)).toBeInTheDocument();
    expect(screen.getByText('I want to eat something 🍽️')).toBeInTheDocument(); // One of the suggestions
  });

  it('sets search query and hides suggestions on suggestion click', () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/What are you looking for today?/i);
    fireEvent.focus(searchInput); // Open suggestions

    const suggestionButton = screen.getByText('I need a website 💻');
    fireEvent.click(suggestionButton);

    expect((searchInput as HTMLInputElement).value).toBe('I need a website 💻');
    expect(screen.queryByText(/AI suggestions for you/i)).not.toBeInTheDocument();
    // Optional: check if onSearch is called immediately on suggestion click (current behavior is not to)
    // expect(mockOnSearch).toHaveBeenCalledWith('I need a website 💻');
  });

  it('hides AI suggestions on search input blur', async () => {
    render(<HeroSection onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/What are you looking for today?/i);

    // 1. Simulate focus to show suggestions
    fireEvent.focus(searchInput);
    expect(screen.getByText(/AI suggestions for you/i)).toBeInTheDocument();

    // 2. Simulate blur
    fireEvent.blur(searchInput);

    // 3. Wait for suggestions to disappear
    await waitFor(() => {
      expect(screen.queryByText(/AI suggestions for you/i)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('I want to eat something 🍽️')).not.toBeInTheDocument();
    });
  });

  it('shows AI suggestions in the selected language after language change and refocus', async () => {
    render(<HeroSection onSearch={mockOnSearch} />);

    // 2. Get the language selector button for French and click it
    const frenchButton = screen.getByRole('button', { name: 'FR' });
    fireEvent.click(frenchButton);

    const searchInput = screen.getByPlaceholderText(/Que cherchez-vous aujourd'hui?/i); // Placeholder changes with language

    // 5. Simulate focus
    fireEvent.focus(searchInput);

    // 6. Assert French suggestion is visible
    expect(screen.getByText('Je veux manger quelque chose 🍽️')).toBeInTheDocument();
    expect(screen.queryByText('I want to eat something 🍽️')).not.toBeInTheDocument(); // English suggestion should not be there

    // 7. Simulate blur
    fireEvent.blur(searchInput);
    await waitFor(() => {
      expect(screen.queryByText('Je veux manger quelque chose 🍽️')).not.toBeInTheDocument();
    });

    // 8. Simulate focus again
    fireEvent.focus(searchInput);

    // 9. Assert French suggestion is still visible
    expect(screen.getByText('Je veux manger quelque chose 🍽️')).toBeInTheDocument();
    expect(screen.queryByText('I want to eat something 🍽️')).not.toBeInTheDocument();
  });
});
