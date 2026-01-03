'use client';

import { Card, Input, Button } from '../ui';

export default function ResumeTab() {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Resume Information</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              defaultValue="John Doe"
              readOnly
            />
            <Input
              label="Position"
              type="text"
              defaultValue="Senior Developer"
              readOnly
            />
            <Input
              label="Department"
              type="text"
              defaultValue="Engineering"
              readOnly
            />
            <Input
              label="Employee ID"
              type="text"
              defaultValue="EMP001"
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-dark-text">
              Professional Summary
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-dark-surfaceHover border border-dark-border rounded-lg text-dark-text placeholder-dark-textMuted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              defaultValue="Experienced software developer with expertise in modern web technologies..."
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-dark-text">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-dark-surfaceHover border border-dark-border rounded-full text-sm text-dark-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-dark-text">
              Education
            </label>
            <div className="space-y-3">
              <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
                <p className="font-medium text-dark-text">Bachelor of Science in Computer Science</p>
                <p className="text-sm text-dark-textSecondary mt-1">University Name • 2018 - 2022</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-dark-text">
              Work Experience
            </label>
            <div className="space-y-3">
              <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
                <p className="font-medium text-dark-text">Senior Developer</p>
                <p className="text-sm text-dark-textSecondary mt-1">Current Company • 2023 - Present</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

