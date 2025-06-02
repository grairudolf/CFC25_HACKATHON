import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast'; // Assuming this is the correct path

interface FeedbackFormProps {
  // Props can be added later if needed
}

interface FeedbackData {
  name?: string;
  email?: string;
  rating?: number;
  message: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    rating: undefined,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: string) => {
    // The value from Select is a string, convert to number
    setFormData(prev => ({ ...prev, rating: value ? parseInt(value, 10) : undefined }));
  };

  const validateForm = (): boolean => {
    if (!formData.message.trim()) {
      setError('Message is required.');
      return false;
    }
    if (formData.email && !/.+\@.+\..+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.name || undefined, // Send undefined if empty, matching schema
            email: formData.email || undefined, // Send undefined if empty
            rating: formData.rating,
            message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for your valuable feedback.",
        });
        setFormData({ name: '', email: '', rating: undefined, message: '' }); // Reset form
      } else {
        setError(result.message || 'Failed to submit feedback. Please try again.');
        toast({
          title: "Error",
          description: result.message || 'Failed to submit feedback.',
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Error",
        description: 'An unexpected error occurred. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto my-8"> {/* Added my-8 for spacing */}
      <h3 className="text-lg font-semibold mb-6 text-center">Submit Your Feedback</h3> {/* Increased mb-6 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name (Optional)</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="rating">Rating (Optional)</Label> {/* Changed to optional as per discussion */}
          <Select
            name="rating"
            onValueChange={handleRatingChange}
            value={formData.rating?.toString()} // Value needs to be string for Select
            disabled={isSubmitting}
          >
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select a rating (1-5)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 - Excellent</SelectItem>
              <SelectItem value="4">4 - Very Good</SelectItem>
              <SelectItem value="3">3 - Good</SelectItem>
              <SelectItem value="2">2 - Fair</SelectItem>
              <SelectItem value="1">1 - Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your feedback..."
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            rows={4} // Added rows for better UX
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
