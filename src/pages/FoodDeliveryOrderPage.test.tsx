import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Needed because Navbar uses Link
import FoodDeliveryOrderPage from './FoodDeliveryOrderPage';

// Mock Navbar and Footer components as they are not the focus of this test
// and might have their own dependencies (like AuthContext or other hooks)
jest.mock('@/components/Navbar', () => () => <nav>Mocked Navbar</nav>);
jest.mock('@/components/Footer', () => () => <footer>Mocked Footer</footer>);

describe('FoodDeliveryOrderPage', () => {
  it('renders the main heading', () => {
    render(
      <BrowserRouter>
        <FoodDeliveryOrderPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /Food Delivery Order/i })).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(
      <BrowserRouter>
        <FoodDeliveryOrderPage />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Order Details/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(
      <BrowserRouter>
        <FoodDeliveryOrderPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /Submit Order/i })).toBeInTheDocument();
  });
});
