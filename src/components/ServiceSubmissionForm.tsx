
import React, { useState } from 'react';
import { Upload, X, Check, Loader2 } from 'lucide-react'; // Added Loader2
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ServiceSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '', // Renamed from serviceName
    category: '',
    website: '',
    // contactInfo and tags removed
  });
  const [description_en, setDescription_en] = useState('');
  const [description_fr, setDescription_fr] = useState('');
  const [description_pid, setDescription_pid] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Type string for preview
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // const [currentTag, setCurrentTag] = useState(''); // Tags removed

  const categories = [
    'Technology',
    'Education',
    'Health',
    'Finance',
    'Agriculture',
    'Marketing',
    'Design',
    'Business Services',
    'Creative Arts',
    'Consulting'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Set the file object
      const reader = new FileReader();
      reader.onloadend = () => { // Use onloadend to ensure result is available
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Also clear the file input if possible, or instruct user to re-select
    const fileInput = document.getElementById('imageUploadInput') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = ""; // This might not work in all browsers for security reasons
    }
  };

  // Tags removed

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      website: '',
    });
    setDescription_en('');
    setDescription_fr('');
    setDescription_pid('');
    setImageFile(null);
    setImagePreview(null);
    setApiError(null);
    // Optionally reset file input
    const fileInput = document.getElementById('imageUploadInput') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('category', formData.category);
    submissionData.append('website', formData.website || ''); // Ensure website is not undefined
    submissionData.append('description', JSON.stringify({
      "en": description_en,
      "fr": description_fr,
      "pid": description_pid
    }));

    if (imageFile) {
      submissionData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`, {
        method: 'POST',
        body: submissionData,
        // Do not set 'Content-Type' header for FormData, browser does it
      });

      if (response.ok) {
        // const result = await response.json(); // Assuming backend sends JSON response
        // console.log('Service submitted successfully:', result);
        setIsSubmitted(true);
        resetForm();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit. Please try again.' }));
        setApiError(errorData?.message || `Error: ${response.status} ${response.statusText}`);
        console.error('Submission failed:', errorData);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      setApiError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // setTimeout for isSubmitted state is removed from original handleSubmit,
  // it's handled by the "Submit Another Service" button now.

  if (isSubmitted) {
    return (
      <section id="submit" className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-12 bg-green-50 border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Service Submitted Successfully! 🎉
            </h2>
            <p className="text-green-700 mb-6">
              Thank you for contributing to Silicon Hub! Your service is now under review
              and will be published once approved by our team.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                // resetForm(); // Form is already reset on successful submission
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Another Service
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Share Your Service with Africa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of innovative service creators. Submit your digital service
            and help other businesses and individuals across Africa succeed.
          </p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Service Submission Form</CardTitle>
            <p className="text-blue-100">Fill out the details below to list your service</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Name -> Name */}
              <div>
                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  id="serviceName"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Professional Website Development"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="imageUploadInput" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Logo/Image (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-transform hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="imageUploadInput" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500 font-medium">
                            Upload an image
                          </span>
                          <input
                            id="imageUploadInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label htmlFor="description_en" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (English) *
                </label>
                <textarea
                  id="description_en"
                  required
                  rows={3}
                  value={description_en}
                  onChange={(e) => setDescription_en(e.target.value)}
                  placeholder="English description of your service..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="description_fr" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (French) *
                </label>
                <textarea
                  id="description_fr"
                  required
                  rows={3}
                  value={description_fr}
                  onChange={(e) => setDescription_fr(e.target.value)}
                  placeholder="French description of your service..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="description_pid" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Pidgin) *
                </label>
                <textarea
                  id="description_pid"
                  required
                  rows={3}
                  value={description_pid}
                  onChange={(e) => setDescription_pid(e.target.value)}
                  placeholder="Pidgin description of your service..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Website (Optional) */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-red-600 font-medium">{apiError}</p>
                </div>
              )}

              {/* Terms */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Submission Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your service will be reviewed before being published.</li>
                  <li>• Ensure all information is accurate and up-to-date.</li>
                  <li>• Services must be legitimate and provide real value.</li>
                  <li>• You'll be notified once your service is approved.</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 px-12 py-3 text-lg w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Service for Review'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceSubmissionForm;
