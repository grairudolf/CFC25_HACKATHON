import React from 'react';
import Navbar from '@/components/Navbar'; // Assuming you want the Navbar here
import Footer from '@/components/Footer';   // Assuming you want the Footer here
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const FoodDeliveryOrderPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here in the future
    alert('Order submitted! (Placeholder)');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={() => {}} allServices={[]} /> {/* Simplified props for Navbar */}
      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Food Delivery Order
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Enter your details and what you'd like to order.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              className="w-full"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </Label>
            <Input
              type="text"
              id="address"
              name="address"
              required
              className="w-full"
              placeholder="Enter your delivery address"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <Label htmlFor="orderDetails" className="block text-sm font-medium text-gray-700 mb-1">
              Order Details
            </Label>
            <Textarea
              id="orderDetails"
              name="orderDetails"
              rows={4}
              required
              className="w-full"
              placeholder="List the items you want to order, e.g., 2x Jollof Rice, 1x Fried Chicken"
            />
          </div>
          <div className="text-center pt-2">
            <Button type="submit" size="lg" className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700">
              Submit Order
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default FoodDeliveryOrderPage;
