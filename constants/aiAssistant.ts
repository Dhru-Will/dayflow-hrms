export type AIUseCase = 'salary' | 'attendance' | 'general';

export interface AIResponse {
  useCase: AIUseCase;
  title: string;
  explanation: string;
  insights?: string[];
}

export const MOCK_AI_RESPONSES: Record<AIUseCase, AIResponse> = {
  salary: {
    useCase: 'salary',
    title: 'Salary Breakdown Explanation',
    explanation: `Your salary is calculated based on several components. The base salary of $120,000 forms the foundation of your compensation. This is then supplemented with a performance bonus of $15,000, which reflects your contributions throughout the year.

Additionally, you receive allowances including housing ($5,000), transportation ($2,000), and meal allowances ($3,000), bringing your total gross annual income to $145,000.

From this gross amount, standard deductions are applied: tax deductions ($25,000), insurance premiums ($5,000), and retirement contributions ($6,000), totaling $36,000 in deductions.

Your net annual salary is $109,000, which translates to approximately $9,083 per month after all deductions.`,
    insights: [
      'Your base salary accounts for 82.8% of your gross income',
      'Allowances represent 6.9% of your total compensation',
      'Deductions are approximately 24.8% of your gross salary',
      'Your effective tax rate is about 17.2%',
    ],
  },
  attendance: {
    useCase: 'attendance',
    title: 'Attendance Insights',
    explanation: `Based on your attendance records, you've maintained a strong attendance pattern. Over the past 30 days, you've been present for 85% of working days, with only 2 absences and 2 days on leave.

Your check-in times are consistently around 9:00 AM, showing good punctuality. Your average work hours per day is 8.2 hours, which indicates you're meeting your full-time commitment.

The attendance system shows you've been on leave for 2 days, which is within your allocated leave balance. Your absence rate of 6.7% is below the company average, demonstrating good attendance reliability.`,
    insights: [
      'Your attendance rate is 85%, above the company average of 78%',
      'Average check-in time: 9:00 AM (consistent punctuality)',
      'Average hours worked: 8.2 hours per day',
      'Leave balance: 18 days remaining',
      'Your attendance pattern shows good reliability',
    ],
  },
  general: {
    useCase: 'general',
    title: 'How can I help?',
    explanation: `I'm your AI assistant here to help you understand your HRMS data better. I can provide explanations and insights about:

• Salary breakdowns and compensation details
• Attendance patterns and insights
• Leave balances and time-off policies
• Employee benefits and entitlements
• Performance metrics and reviews

Simply select a topic from the menu, or ask me a question about any aspect of your employee information. I'll provide clear, detailed explanations to help you better understand your data.`,
    insights: [
      'Click on specific topics to get detailed explanations',
      'All insights are based on your current data',
      'Information is updated in real-time',
    ],
  },
};

