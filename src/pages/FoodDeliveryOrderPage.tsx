import React, { useState } from "react";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom"; // Import Link
import { Home } from "lucide-react"; // Import Home icon

const FoodDeliveryOrderPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    //alert("Order submitted! Payment processing...");
    const formData = new FormData(event.target);
    console.log(formData);
    
    fetch('https://cfc25hackathonbackend-production.up.railway.app/api/pay/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2MwYWZlNDZmZmYyOTIxZTczYjUyZCIsImlhdCI6MTc0ODc2NTY1NSwiZXhwIjoxNzQ4ODUyMDU1fQ.u3RDUZT38HxWcPpYaqHeHy_6iFALCRI_K3gJuLRwrFU'
      },
      body: JSON.stringify({
        mobileMoneyNumber: '237651471427',
        amount: 1000
      })
    }).then(res => res.json())
    .then(data => console.log(data));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={() => {}} allServices={[]} />
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150 text-sm">
            <Home className="w-4 h-4 mr-1.5" />
            Return to Home
          </Link>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Food Delivery Order
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Enter your details, order items, and payment information.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          {/* Personal Details Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Personal Details
            </h2>
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                <Label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                <Label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phone"
                  required
                  className="w-full"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <div>
              <Label
                htmlFor="orderDetails"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Items to Order
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
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Information
            </h2>
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payment Method
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="credit-card">Credit Card</SelectItem> */}
                    <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    <SelectItem value="cash-on-delivery">
                      Cash on Delivery
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === "credit-card" && (
                <div>
                  <Label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </Label>
                  {/* <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    className="w-full"
                    placeholder="Enter your card number"
                  /> */}
                </div>
              )}
              {paymentMethod === "mobile-money" && (
                <div>
                  <Label
                    htmlFor="mobileMoneyNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mobile Money Number
                  </Label>
                  <Input
                    type="tel"
                    id="mobileMoneyNumber"
                    name="mobileMoneyNumber"
                    required
                    className="w-full"
                    placeholder="Enter your mobile money number"
                  />
                  Amount
                    <Input
                    id="amount"
                    name="amount"
                    required
                    className="w-full"
                    placeholder="Enter the amount"
                  />

                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <Input
              type="submit"
              // size="lg"
              className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700"
              onSubmit={handleSubmit}
              Submit Order
            />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default FoodDeliveryOrderPage;
