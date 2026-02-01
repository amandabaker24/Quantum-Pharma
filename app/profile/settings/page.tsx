'use client';

import { useState, useEffect } from 'react';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/v1/users/me/profile');
      const data = await response.json();
      
      setProfile(data.data);
      setFormData({
        name: data.data.name,
        email: data.data.email,
        street: data.data.street || '',
        city: data.data.city || '',
        state: data.data.state || '',
        zipCode: data.data.zipCode || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');
    setWarningMessage('');

    // This sends an HTTP request with the current version number to the backend in 
    // route.ts line 67
    try {
      const response = await fetch('/api/v1/users/me/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'If-Match': profile?.version ? profile.version.toString() : '1'
        },
        body: JSON.stringify(formData)
      });
      
      // This line waits for the backends response to be converted into JSON into JS
      // This allows frontend to easily access the response's protperites like error messages
      // or updated profile data
      const data = await response.json(); 

      // This codeblock displays validation errors to the user if there is any 
      if (!response.ok) {
        // Handle errors
        if (data.error?.fields) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, error] of Object.entries(data.error.fields)) {
            fieldErrors[field] = (error as any).message;
          }
          setErrors(fieldErrors);
        } else {
          alert(`Error: ${data.error?.message || 'Update failed'}`);
        }
      } else {
        // Success!
        // This causes the page to re-render and display the updated profile info
        setProfile(data.data); 
        
        // Show success message from API if provided
        if (data.meta?.successMessage) {
          setSuccessMessage(data.meta.successMessage);
        } else {
          setSuccessMessage('');
        }
        
        // Show warnings if any
        if (data.meta?.warnings && data.meta.warnings.length > 0) {
          setWarningMessage(data.meta.warnings[0].message);
        } else {
          setWarningMessage('');
        }
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // UI styling & Input fields 
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Profile Settings
      </h1>

      {/* Success Message */}
      {successMessage && (
        <div style={{
          padding: '12px',
          backgroundColor: '#10b981',
          color: 'white',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          {successMessage}
        </div>
      )}

      {/* Warning Message */}
      {warningMessage && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f59e0b',
          color: 'white',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          {warningMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="name" 
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.name ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {errors.name && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="email" 
            style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.email ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {errors.email && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Home Address Section */}
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Home Address</h3>
        </div>

        {/* Street */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="street" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Street Address
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.street ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {errors.street && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.street}
            </p>
          )}
        </div>

        {/* City */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="city" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.city ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
          {errors.city && (
            <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
              {errors.city}
            </p>
          )}
        </div>

        {/* State and Zip Code Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          {/* State */}
          <div style={{ flex: '1' }}>
            <label htmlFor="state" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              placeholder="CA"
              maxLength={2}
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.state ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
            {errors.state && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.state}
              </p>
            )}
          </div>

          {/* Zip Code */}
          <div style={{ flex: '1' }}>
            <label htmlFor="zipCode" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Zip Code
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.zipCode ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
            {errors.zipCode && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.zipCode}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '10px 24px',
              backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => setFormData({ name: '', email: '', street: '', city: '', state: '', zipCode: '' })}
            style={{
              padding: '10px 24px',
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
