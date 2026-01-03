'use client';

import { Card, Input } from '../ui';

export default function PrivateInfoTab() {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Personal Information</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              defaultValue="john.doe@dayflow.com"
              readOnly
            />
            <Input
              label="Phone"
              type="tel"
              defaultValue="+1-555-0101"
              readOnly
            />
            <Input
              label="Date of Birth"
              type="date"
              defaultValue="1990-01-15"
              readOnly
            />
            <Input
              label="Gender"
              type="text"
              defaultValue="Male"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-dark-text">
              Address
            </label>
            <Input
              type="text"
              defaultValue="123 Main Street"
              readOnly
              className="mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                defaultValue="New York"
                placeholder="City"
                readOnly
              />
              <Input
                type="text"
                defaultValue="NY"
                placeholder="State"
                readOnly
              />
              <Input
                type="text"
                defaultValue="10001"
                placeholder="ZIP Code"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Emergency Contact Name"
              type="text"
              defaultValue="Jane Doe"
              readOnly
            />
            <Input
              label="Emergency Contact Phone"
              type="tel"
              defaultValue="+1-555-0102"
              readOnly
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

