'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Input, Card } from '@/components/ui';

interface FormData {
  companyName: string;
  adminName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  logo: File | null;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    adminName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    logo: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare form data for console.log
    const submitData = {
      companyName: formData.companyName,
      adminName: formData.adminName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      logo: formData.logo ? {
        name: formData.logo.name,
        size: formData.logo.size,
        type: formData.logo.type,
      } : null,
    };

    console.log('Form submitted:', submitData);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Company Signup
            </span>
          </h1>
          <p className="text-dark-textSecondary text-lg">
            Create your company account and get started
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-6 border-primary-500/30 bg-primary-950/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-primary-300 mb-1">
                Important Notice
              </p>
              <p className="text-sm text-dark-textSecondary">
                Employees cannot self-register. This signup is for company administrators only.
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <Input
              label="Company Name"
              type="text"
              value={formData.companyName}
              onChange={handleInputChange('companyName')}
              placeholder="Enter your company name"
              error={errors.companyName}
              required
            />

            {/* Admin Name */}
            <Input
              label="Admin Name"
              type="text"
              value={formData.adminName}
              onChange={handleInputChange('adminName')}
              placeholder="Enter admin full name"
              error={errors.adminName}
              required
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="admin@company.com"
              error={errors.email}
              required
            />

            {/* Phone */}
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 (555) 000-0000"
              error={errors.phone}
              required
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Enter password (min. 8 characters)"
              error={errors.password}
              helperText="Password must be at least 8 characters long"
              required
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
              required
            />

            {/* Logo Upload */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-dark-text">
                Company Logo
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="logo-upload"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="px-4 py-3 bg-dark-surfaceHover border border-dark-border rounded-lg hover:border-primary-500 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-dark-textSecondary">
                          {formData.logo ? formData.logo.name : 'Choose file...'}
                        </span>
                        <svg
                          className="w-5 h-5 text-dark-textSecondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                    </div>
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>

                {logoPreview && (
                  <div className="relative w-32 h-32 border border-dark-border rounded-lg overflow-hidden bg-dark-surfaceHover">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                )}

                <p className="text-xs text-dark-textSecondary">
                  Recommended: Square image, max 2MB. Formats: PNG, JPG, SVG
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Create Company Account
              </Button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-sm text-dark-textSecondary">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

