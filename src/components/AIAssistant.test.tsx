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
    vi.useFakeTimers();
    const mockIntersectionObserverGlobal = vi.fn();
    mockIntersectionObserverGlobal.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserverGlobal;
    // Mock global.fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks(); // This will also restore global.fetch if it was spied on.
                           // If global.fetch was directly assigned, reset it manually: delete global.fetch;
  });

  // Helper to open chat
  const openChatAndSwitchLanguage = async (lang: 'EN' | 'FR' | 'PID' = 'EN') => {
    // The main toggle button might be the first button rendered or needs a specific aria-label.
    // For now, using a less specific selector that might grab the main toggle button.
    // It's better to have a specific aria-label like "Toggle Chat Window" on the button.
    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton);

    // Wait for chat to open and language buttons to be available
    const langButton = await screen.findByRole('button', { name: lang });
    fireEvent.click(langButton);

    // Verify language switch by checking for a known piece of text in the target language's initial message
    let expectedInitialMessagePart;
    if (lang === 'EN') {
      expectedInitialMessagePart = /Hello! I'm your SiliconHub assistant./i;
    } else if (lang === 'FR') {
      expectedInitialMessagePart = /Bonjour! Je suis votre assistant SiliconHub./i;
    } else { // PID
      expectedInitialMessagePart = /Salut! Na me be ya SiliconHub assistant./i;
    }
    await screen.findByText(expectedInitialMessagePart);
  };


  it('renders closed initially, then opens and shows default language (English)', async () => {
    render(<AIAssistant />);
    expect(screen.queryByText('SiliconHub Assistant')).not.toBeInTheDocument();

    const toggleChatButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleChatButton);

    await screen.findByText('SiliconHub Assistant'); // English header by default
    expect(screen.getByText('here to help you 🇨🇲')).toBeInTheDocument();
    expect(screen.getByText(/Hello! I'm your SiliconHub assistant./i)).toBeInTheDocument();
    expect(screen.getByText('🍽️ I want to eat')).toBeInTheDocument();
  });

  it('changes UI elements to French when FR language is selected', async () => {
    render(<AIAssistant />);
    await openChatAndSwitchLanguage('FR');

    await screen.findByText('Assistant SiliconHub'); // French header
    expect(screen.getByText('là pour vous aider 🇨🇲')).toBeInTheDocument();
    expect(screen.getByText(/Bonjour! Je suis votre assistant SiliconHub./i)).toBeInTheDocument();
    expect(screen.getByText('🍽️ Je veux manger')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tapez votre message...')).toBeInTheDocument();
  });

  it('changes UI elements to Pidgin when PID language is selected', async () => {
    render(<AIAssistant />);
    await openChatAndSwitchLanguage('PID');

    await screen.findByText('SiliconHub Assistant'); // Pidgin header (same as EN for this string)
    expect(screen.getByText('dey here for helep you 🇨🇲')).toBeInTheDocument();
    expect(screen.getByText(/Salut! Na me be ya SiliconHub assistant./i)).toBeInTheDocument();
    expect(screen.getByText('🍽️ I wan chop')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write ya message...')).toBeInTheDocument();
  });

  it('sends a message and receives a bot response in English (default)', async () => {
    render(<AIAssistant />);
    await openChatAndSwitchLanguage('EN');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'I want food' } });
    fireEvent.click(sendButton);

    await screen.findByText('I want food');
    act(() => { vi.runAllTimers(); });
    await screen.findByText(/Perfect! FastChops is the best delivery service/i);
    expect((input as HTMLInputElement).value).toBe('');
  });

  // --- Payment Initiation Tests ---

  it('bot asks for phone number on payment intent', async () => {
    render(<AIAssistant />);
    await openChatAndSwitchLanguage('EN');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'start payment' } });
    fireEvent.click(sendButton);

    await screen.findByText('start payment'); // User message
    act(() => { vi.runAllTimers(); });

    await screen.findByText(/Okay, I can help with that. Please provide your phone number./i);
  });

  it('handles successful payment initiation', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Success", success: "true" }),
    });

    render(<AIAssistant />);
    await openChatAndSwitchLanguage('EN');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // 1. User expresses intent to pay
    fireEvent.change(input, { target: { value: 'initiate payment' } });
    fireEvent.click(sendButton);
    await screen.findByText('initiate payment');
    act(() => { vi.runAllTimers(); });
    await screen.findByText(/Okay, I can help with that. Please provide your phone number./i);
    expect((input as HTMLInputElement).value).toBe(''); // Input cleared after asking for number

    // 2. User provides phone number
    fireEvent.change(input, { target: { value: '123456789' } });
    fireEvent.click(sendButton);
    await screen.findByText('123456789'); // User's phone number message

    act(() => { vi.runAllTimers(); }); // For setIsTyping and initial bot message

    // Bot acknowledges receiving number (paymentInitiationNoted)
    await screen.findByText(/Got it. I'll use the next message as your phone number for the payment./i);

    // Ensure fetch is called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/nkwa/pay/123456789', { method: 'GET' });

    act(() => { vi.runAllTimers(); }); // For fetch promise and subsequent bot message

    // Bot confirms successful payment
    await screen.findByText(/Your payment request has been initiated successfully./i);
    expect((input as HTMLInputElement).value).toBe(''); // Input cleared
  });

  it('handles failed payment initiation (API error)', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false, // Simulate API error
    });

    render(<AIAssistant />);
    await openChatAndSwitchLanguage('EN');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'pay now' } });
    fireEvent.click(sendButton);
    await screen.findByText('pay now');
    act(() => { vi.runAllTimers(); });
    await screen.findByText(/Okay, I can help with that. Please provide your phone number./i);

    fireEvent.change(input, { target: { value: '987654321' } });
    fireEvent.click(sendButton);
    await screen.findByText('987654321');
    act(() => { vi.runAllTimers(); });

    await screen.findByText(/Got it. I'll use the next message as your phone number for the payment./i);
    expect(global.fetch).toHaveBeenCalledWith('/api/nkwa/pay/987654321', { method: 'GET' });
    act(() => { vi.runAllTimers(); });

    await screen.findByText(/Sorry, I couldn't initiate the payment. Please try again later./i);
  });

  it('handles invalid phone number provided', async () => {
    render(<AIAssistant />);
    await openChatAndSwitchLanguage('EN');

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'make payment' } });
    fireEvent.click(sendButton);
    await screen.findByText('make payment');
    act(() => { vi.runAllTimers(); });
    await screen.findByText(/Okay, I can help with that. Please provide your phone number./i);

    fireEvent.change(input, { target: { value: 'abc' } }); // Invalid phone number
    fireEvent.click(sendButton);
    await screen.findByText('abc');
    act(() => { vi.runAllTimers(); });

    await screen.findByText(/The phone number provided seems invalid. Please provide a valid number./i);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
