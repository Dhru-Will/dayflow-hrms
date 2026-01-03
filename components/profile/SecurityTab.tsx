'use client';

import { Card, Input, Button } from '../ui';

export default function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Change Password</h3>
        
        <div className="space-y-6">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            helperText="Password must be at least 8 characters long"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
          
          <Button variant="primary" className="w-full md:w-auto">
            Update Password
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Two-Factor Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <div>
              <p className="font-medium text-dark-text">Two-Factor Authentication</p>
              <p className="text-sm text-dark-textSecondary mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-dark-textSecondary">Disabled</span>
              <button className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm font-medium text-dark-text hover:bg-dark-surfaceHover transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Active Sessions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <div>
              <p className="font-medium text-dark-text">Current Session</p>
              <p className="text-sm text-dark-textSecondary mt-1">
                Chrome on Windows • Last active: Just now
              </p>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

