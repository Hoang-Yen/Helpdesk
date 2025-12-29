import { Category, Article, VideoTutorial } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Everything you need to know to set up your SpouX account.',
    iconName: 'Rocket'
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'Learn how to leverage SpouX AI for faster validation.',
    iconName: 'Bot'
  },
  {
    id: 'validation-tactics',
    name: 'Validation Tactics',
    description: 'Best practices for validating your business ideas.',
    iconName: 'Target'
  },
  {
    id: 'account-billing',
    name: 'Account & Billing',
    description: 'Manage your subscription, team members, and invoices.',
    iconName: 'CreditCard'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'quick-start-guide',
    categoryId: 'getting-started',
    title: 'SpouX Quick Start Guide',
    excerpt: 'Get your first project up and running in less than 5 minutes.',
    isPopular: true,
    lastUpdated: 'Oct 24, 2023',
    relatedArticleIds: ['inviting-team-members', 'setting-up-integrations'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: '<p>Welcome to SpouX! This guide will walk you through the essential steps to launch your first idea validation campaign.</p>'
      },
      {
        id: 'create-account',
        title: '1. Create your account',
        content: '<p>If you haven\'t already, sign up at SpouX.com. You\'ll need to verify your email address before continuing.</p>'
      },
      {
        id: 'first-project',
        title: '2. Create your first project',
        content: `
          <div class="space-y-4">
            <p>Click the <strong>"New Project"</strong> button in the dashboard top-right corner.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Give your project a name (e.g., "SaaS Idea 2024").</li>
              <li>Select your target industry.</li>
              <li>Choose a validation goal (e.g., "Collect 100 emails").</li>
            </ul>
          </div>
        `
      }
    ]
  },
  {
    id: 'inviting-team-members',
    categoryId: 'account-billing',
    title: 'Inviting Team Members',
    excerpt: 'Collaborate with your team by adding them to your workspace.',
    isPopular: false,
    lastUpdated: 'Nov 12, 2023',
    relatedArticleIds: ['quick-start-guide'],
    sections: [
      {
        id: 'invite-process',
        title: 'How to invite users',
        content: '<p>Navigate to Settings > Team. Enter the email addresses of the people you want to invite. They will receive an email with a magic link.</p>'
      }
    ]
  },
  {
    id: 'using-ai-generator',
    categoryId: 'ai-assistant',
    title: 'Generating Landing Copy with AI',
    excerpt: 'Use our AI to write high-converting landing page copy automatically.',
    isPopular: true,
    lastUpdated: 'Dec 05, 2023',
    relatedArticleIds: [],
    sections: [
      {
        id: 'how-it-works',
        title: 'How the AI works',
        content: '<p>SpouX uses advanced LLMs to analyze your value proposition and generate copy that speaks to your target audience\'s pain points.</p>'
      },
      {
        id: 'prompts',
        title: 'Refining the output',
        content: '<p>If you don\'t like the initial result, use the "Regenerate" button or provide a custom instruction like "Make it more professional" or "Focus on speed".</p>'
      }
    ]
  },
  {
    id: 'ab-testing-basics',
    categoryId: 'validation-tactics',
    title: 'A/B Testing Basics',
    excerpt: 'Learn the fundamentals of splitting traffic to test different value props.',
    isPopular: true,
    lastUpdated: 'Jan 15, 2024',
    relatedArticleIds: ['using-ai-generator'],
    sections: [
      {
        id: 'concept',
        title: 'What is A/B Testing?',
        content: '<p>A/B testing involves showing two variants of the same web page to different segments of website visitors at the same time and comparing which variant drives more conversions.</p>'
      }
    ]
  },
  {
    id: 'setting-up-integrations',
    categoryId: 'getting-started',
    title: 'Setting up Integrations',
    excerpt: 'Connect SpouX to Slack, Notion, and your CRM.',
    isPopular: false,
    lastUpdated: 'Feb 10, 2024',
    relatedArticleIds: ['quick-start-guide'],
    sections: [
      {
        id: 'api-keys',
        title: 'Generating API Keys',
        content: '<p>Go to your developer settings to generate a new API key. Treat this key like a password.</p>'
      }
    ]
  }
];

export const VIDEOS: VideoTutorial[] = [
  {
    id: 'v1',
    title: 'SpouX Platform Overview',
    description: 'A 2-minute tour of the main dashboard and features.',
    thumbnailUrl: 'https://picsum.photos/600/338?random=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    duration: '2:15',
    level: 'Beginner'
  },
  {
    id: 'v2',
    title: 'Mastering AI Prompts',
    description: 'Advanced techniques for getting the best results from the AI Assistant.',
    thumbnailUrl: 'https://picsum.photos/600/338?random=2',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:40',
    level: 'Advanced'
  },
  {
    id: 'v3',
    title: 'Understanding Analytics',
    description: 'How to read the validation charts and make decisions.',
    thumbnailUrl: 'https://picsum.photos/600/338?random=3',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:20',
    level: 'Intermediate'
  }
];