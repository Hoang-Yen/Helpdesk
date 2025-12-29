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
    tags: ['onboarding', 'setup', 'first-steps'],
    relatedArticleIds: ['inviting-team-members', 'setting-up-integrations'],
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: 'Welcome to SpouX! This guide will walk you through the essential steps to launch your first idea validation campaign.'
      },
      {
        id: 'create-account',
        title: '1. Create your account',
        content: 'If you haven\'t already, sign up at **SpouX.com**. You\'ll need to verify your email address before continuing.'
      },
      {
        id: 'first-project',
        title: '2. Create your first project',
        content: 'Click the **"New Project"** button in the dashboard top-right corner.\n\n* Give your project a name (e.g., "SaaS Idea 2024").\n* Select your target industry.\n* Choose a validation goal (e.g., "Collect 100 emails").'
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
    tags: ['collaboration', 'users', 'access'],
    relatedArticleIds: ['quick-start-guide'],
    sections: [
      {
        id: 'invite-process',
        title: 'How to invite users',
        content: 'Navigate to **Settings > Team**. Enter the email addresses of the people you want to invite. They will receive an email with a magic link.'
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
    tags: ['ai', 'copywriting', 'landing-page'],
    relatedArticleIds: [],
    sections: [
      {
        id: 'how-it-works',
        title: 'How the AI works',
        content: 'SpouX uses advanced LLMs to analyze your value proposition and generate copy that speaks to your target audience\'s pain points.'
      },
      {
        id: 'prompts',
        title: 'Refining the output',
        content: 'If you don\'t like the initial result, use the **"Regenerate"** button or provide a custom instruction like _"Make it more professional"_ or _"Focus on speed"_.'
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
    tags: ['testing', 'optimization', 'conversion'],
    relatedArticleIds: ['using-ai-generator'],
    sections: [
      {
        id: 'concept',
        title: 'What is A/B Testing?',
        content: 'A/B testing involves showing two variants of the same web page to different segments of website visitors at the same time and comparing which variant drives more conversions.'
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
    tags: ['api', 'slack', 'notion', 'crm'],
    relatedArticleIds: ['quick-start-guide'],
    sections: [
      {
        id: 'api-keys',
        title: 'Generating API Keys',
        content: 'Go to your developer settings to generate a new API key. **Treat this key like a password.**'
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