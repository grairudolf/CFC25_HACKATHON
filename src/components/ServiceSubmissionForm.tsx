
import React, { useState } from 'react';
import { Upload, X, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ServiceSubmissionForm = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    category: '',
    contactInfo: '',
    website: '',
    tags: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTag, setCurrentTag] = useState('');

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const addTag = () => {
  //   if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
  //     setFormData(prev => ({
  //       ...prev,
  //       tags: [...prev.tags, currentTag.trim()]
  //     }));
  //     setCurrentTag('');
  //   }
  // };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting service:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        serviceName: '',
        description: '',
        category: '',
        contactInfo: '',
        website: '',
        tags: []
      });
      setImagePreview(null);
    }, 3000);
  };

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
              onClick={() => setIsSubmitted(false)}
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
          <CardHeader className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Service Submission Form</CardTitle>
            <p className="text-blue-100">Fill out the details below to list your service</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.serviceName}
                  onChange={(e) => handleInputChange('serviceName', e.target.value)}
                  placeholder="e.g., Professional Website Development"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="w-full">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Logo/Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500 font-medium">
                            Upload an image
                          </span>
                          <input
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

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your service, what you offer, and what makes it unique..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label> */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {/* <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div> */}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    placeholder="Email, phone, or WhatsApp"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website(Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Submission Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your service will be reviewed before being published</li>
                  <li>• Ensure all information is accurate and up-to-date</li>
                  <li>• Services must be legitimate and provide real value</li>
                  <li>• You'll be notified once your service is approved</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 px-12 py-3 text-lg"
                >
                  Submit Service for Review
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
