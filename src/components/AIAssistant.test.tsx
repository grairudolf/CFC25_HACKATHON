import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AIAssistant from './AIAssistant'; // Adjust path as needed
import React from 'react';

// Mock IntersectionObserver if used by animations (though not directly by AIAssistant's core logic)
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('AIAssistant Component', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers for setTimeout in handleSendMessage
    // IntersectionObserver mock for animations
    const mockIntersectionObserverGlobal = vi.fn(); // Renamed to avoid conflict
    mockIntersectionObserverGlobal.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserverGlobal;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers(); // Restore real timers
    vi.clearAllMocks();
  });

  const openChat = () => {
    const toggleButton = screen.getByRole('button', { name: /open chat/i }); // Assuming an aria-label or accessible name
    fireEvent.click(toggleButton);
  };

  // Helper to find language buttons by their text content (EN, FR, PID)
  const getLanguageButton = (langText: 'EN' | 'FR' | 'PID') => {
    // The buttons get their text from currentText.ui.langButton<LANG>,
    // so we need to find them based on what they'd render in default (French) or selected language.
    // For simplicity, let's assume they always render 'EN', 'FR', 'PID' and are distinguishable.
    return screen.getByRole('button', { name: langText });
  };


  it('renders closed initially, then opens and shows default language (French)', () => {
    render(<AIAssistant />);
    // Chat window should not be visible initially
    expect(screen.queryByText('Assistant IA Cameroun')).not.toBeInTheDocument();

    // Find toggle button by its visual content if no explicit label
    const toggleButton = screen.getByRole('button'); // This might be too generic
    // A better way is to add an aria-label to the toggle button in AIAssistant.tsx
    // For now, assuming it's the only button initially or identifiable.
    // Let's give it a temporary aria-label in the component for testing:
    // In AIAssistant.tsx: <Button aria-label="Open Chat" ...>
    // For now, we assume the button is the one with MessageCircle icon initially.
    // Test will be more robust with a proper aria-label. Let's assume we added `aria-label="Toggle Chat"`

    // If button has <MessageCircle /> icon, then it's the toggle button
    // This is brittle. Let's assume we add aria-label="Toggle Chat Window" to the toggle button.
    // In AIAssistant.tsx, change the toggle button to include aria-label="Toggle Chat Window"
    const toggleChatButton = screen.getByRole('button'); // This will need adjustment if other buttons are present initially
    fireEvent.click(toggleChatButton);

    // Now the chat window should be open
    expect(screen.getByText('Assistant IA Cameroun')).toBeInTheDocument(); // French header
    expect(screen.getByText('là pour vous aider 🇨🇲')).toBeInTheDocument(); // French subtitle
    // Check for initial bot message in French
    expect(screen.getByText(/Bonjour! Je suis votre assistant IA camerounais./i)).toBeInTheDocument();
    // Check for quick suggestions in French
    expect(screen.getByText('🍽️ Je veux manger')).toBeInTheDocument();
  });

  it('changes UI elements to English when EN language is selected', async () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0]; // First button is the toggle
    fireEvent.click(toggleChatButton); // Open chat

    const enButton = screen.getByRole('button', { name: 'EN' });
    fireEvent.click(enButton);

    // UI updates to English
    await screen.findByText('Cameroon AI Assistant'); // English header
    expect(screen.getByText('here to help you 🇨🇲')).toBeInTheDocument(); // English subtitle
    expect(screen.getByText(/Hello! I'm your Cameroonian AI assistant./i)).toBeInTheDocument(); // English initial message
    expect(screen.getByText('🍽️ I want to eat')).toBeInTheDocument(); // English quick suggestion
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  it('changes UI elements to Pidgin when PID language is selected', async () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton); // Open chat

    const pidButton = screen.getByRole('button', { name: 'PID' });
    fireEvent.click(pidButton);

    await screen.findByText('Cameroon AI Assistant'); // Pidgin header (same as EN for this string)
    expect(screen.getByText('dey here for helep you 🇨🇲')).toBeInTheDocument(); // Pidgin subtitle
    expect(screen.getByText(/Salut! Na me be ya Cameroon AI assistant./i)).toBeInTheDocument(); // Pidgin initial message
    expect(screen.getByText('🍽️ I wan chop')).toBeInTheDocument(); // Pidgin quick suggestion
    expect(screen.getByPlaceholderText('Write ya message...')).toBeInTheDocument();
  });

  it('generateCameroonianBotResponse returns responses in selected language (EN)', () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton);
    fireEvent.click(screen.getByRole('button', { name: 'EN' })); // Switch to EN

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i }); // Assuming Send button has accessible name or use icon selector

    fireEvent.change(input, { target: { value: 'I want food' } });
    fireEvent.click(sendButton);

    act(() => {
      vi.runAllTimers(); // Advance timers for bot response
    });

    // Check for bot response in English
    expect(screen.getByText(/Perfect! FastChops is the best delivery service/i)).toBeInTheDocument();
  });

  it('generateCameroonianBotResponse returns responses in selected language (PID)', () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton);
    fireEvent.click(screen.getByRole('button', { name: 'PID' })); // Switch to PID

    const input = screen.getByPlaceholderText('Write ya message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'I wan chop' } });
    fireEvent.click(sendButton);

    act(() => {
      vi.runAllTimers();
    });

    // Check for bot response in Pidgin
    expect(screen.getByText(/Correct! FastChops na correct delivery service/i)).toBeInTheDocument();
  });

  it('sends a message and receives a bot response in French (default)', async () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton);

    const input = screen.getByPlaceholderText('Tapez votre message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Je veux manger' } });
    expect((input as HTMLInputElement).value).toBe('Je veux manger'); // Ensure input value is set
    fireEvent.click(sendButton);

    // User message appears
    await screen.findByText('Je veux manger');

    act(() => {
      vi.runAllTimers(); // Advance timers for bot response
    });

    // Bot response appears in French
    await screen.findByText(/Perfect! FastChops est le meilleur service de livraison/i);
    expect((input as HTMLInputElement).value).toBe(''); // Input is cleared
  });

  it('uses quick suggestion and gets a response', async () => {
    render(<AIAssistant />);
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton); // Open chat

    // Default is French
    const quickSuggestionButton = screen.getByText("🍽️ Je veux manger");
    fireEvent.click(quickSuggestionButton);

    // User message (from quick suggestion) appears
    await screen.findByText("🍽️ Je veux manger");

    act(() => {
      vi.runAllTimers(); // Advance timers for bot response
    });

    // Bot response appears
    await screen.findByText(/Perfect! FastChops est le meilleur service de livraison/i);
  });
});
