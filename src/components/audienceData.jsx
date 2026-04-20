import React from 'react';

export const audienceCategories = [
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'sales', label: 'Sales' },
  { slug: 'human-resources', label: 'Human Resources' },
  { slug: 'information-technology', label: 'Information Technology' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'business-leaders', label: 'Business Leaders' },
  { slug: 'supply-chain', label: 'Supply Chain' },
  { slug: 'learning-and-development', label: 'Learning & Development' },
  { slug: 'customer-experience', label: 'Customer Experience' },
  { slug: 'others', label: 'Others' },
];

export const categorySlugToLabel = audienceCategories.reduce((acc, item) => {
  acc[item.slug] = item.label;
  return acc;
}, {});

const trendLabels = Array.from({ length: 30 }, (_, index) => `Day ${index + 1}`);
const barLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

const randomBetween = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100;
const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const normalizePercentages = (values) => {
  const total = values.reduce((sum, value) => sum + value, 0);
  return values.map((value, index) => {
    const rounded = Math.round((value / total) * 100);
    return index === values.length - 1
      ? 100 - values.slice(0, -1).reduce((sum, v, i) => sum + Math.round((v / total) * 100), 0)
      : rounded;
  });
};

const buildTrend = (base, amplitude, noise, lower = 5, upper = 40) =>
  trendLabels.map((_, idx) => {
    const value = base + Math.sin(idx / (3 + Math.random() * 2)) * amplitude + randomBetween(-noise, noise);
    return parseFloat(Math.min(Math.max(value, lower), upper).toFixed(1));
  });

const buildDonut = (baseValues) => normalizePercentages(baseValues.map((value) => value + randomBetween(-4, 4)));

const categoryProfiles = {
  marketing: {
    audienceSize: [32, 48],
    openBase: 28,
    ctrBase: 10,
    downloadBase: [420, 480, 450, 520],
    engagementBase: [260, 300, 280, 340],
    jobTitles: ['VP of Marketing', 'Demand Gen Lead', 'Content Director', 'Growth Strategist', 'Brand Manager'],
    topics: ['ABM', 'Pipeline Acceleration', 'Demand Gen', 'Channel Activation', 'Content Syndication'],
    keywords: ['Intent Data', 'Sponsored Email', 'ABM Lists', 'Purchase Signals', 'Campaign ROI'],
    donut: {
      jobLevel: [12, 20, 24, 18, 26],
      companySize: [18, 20, 20, 14, 16, 12],
      annualRevenue: [30, 20, 18, 14, 10, 8],
    },
  },
  sales: {
    audienceSize: [24, 38],
    openBase: 25,
    ctrBase: 9,
    downloadBase: [380, 430, 400, 470],
    engagementBase: [220, 270, 250, 310],
    jobTitles: ['Sales Director', 'Account Executive', 'Revenue Ops Lead', 'Business Development Manager', 'Inside Sales Manager'],
    topics: ['Sales Enablement', 'Pipeline Growth', 'ABX', 'Deal Velocity', 'CRM Adoption'],
    keywords: ['Sales Triggers', 'Lead Qualification', 'Opportunity Scoring', 'Deal Intelligence', 'Outreach Cadence'],
    donut: {
      jobLevel: [8, 22, 28, 18, 24],
      companySize: [14, 18, 22, 16, 18, 12],
      annualRevenue: [26, 24, 18, 16, 10, 6],
    },
  },
  'human-resources': {
    audienceSize: [1.8, 9.5],
    openBase: 18,
    ctrBase: 6,
    downloadBase: [120, 160, 140, 180],
    engagementBase: [110, 130, 125, 145],
    jobTitles: ['HR Director', 'Talent Acquisition Lead', 'People Ops Manager', 'Chief HR Officer', 'L&D Specialist'],
    topics: ['Employee Experience', 'Workplace Culture', 'Talent Retention', 'Diversity & Inclusion', 'Performance Management'],
    keywords: ['HR Technology', 'Employee Engagement', 'Recruitment Marketing', 'Career Mobility', 'Culture Strategy'],
    donut: {
      jobLevel: [35, 28, 18, 10, 9],
      companySize: [24, 22, 18, 12, 14, 10],
      annualRevenue: [20, 18, 20, 16, 14, 12],
    },
  },
  'information-technology': {
    audienceSize: [18, 42],
    openBase: 26,
    ctrBase: 8.5,
    downloadBase: [360, 420, 390, 450],
    engagementBase: [230, 280, 260, 320],
    jobTitles: ['CTO', 'IT Director', 'Cloud Architect', 'Security Manager', 'Network Operations Lead'],
    topics: ['Cloud Migration', 'Security', 'DevOps', 'Infrastructure', 'Data Strategy'],
    keywords: ['Digital Transformation', 'Cybersecurity', 'Hybrid Cloud', 'Network Automation', 'Data Integration'],
    donut: {
      jobLevel: [10, 22, 26, 20, 22],
      companySize: [16, 18, 22, 14, 16, 14],
      annualRevenue: [28, 22, 16, 14, 12, 8],
    },
  },
  finance: {
    audienceSize: [12, 28],
    openBase: 22,
    ctrBase: 8,
    downloadBase: [240, 300, 280, 330],
    engagementBase: [190, 230, 215, 255],
    jobTitles: ['CFO', 'Finance Director', 'FP&A Manager', 'Risk Officer', 'Treasury Lead'],
    topics: ['Financial Planning', 'Risk Management', 'Automation', 'Reporting', 'Compliance'],
    keywords: ['Financial Analytics', 'Cash Flow', 'Expense Optimization', 'RegTech', 'Treasury Management'],
    donut: {
      jobLevel: [12, 18, 24, 18, 28],
      companySize: [16, 20, 20, 14, 16, 14],
      annualRevenue: [26, 24, 18, 14, 10, 8],
    },
  },
  'business-leaders': {
    audienceSize: [2.5, 16],
    openBase: 23,
    ctrBase: 7.5,
    downloadBase: [180, 220, 200, 240],
    engagementBase: [150, 180, 170, 205],
    jobTitles: ['CEO', 'COO', 'Managing Director', 'Strategy Lead', 'Business Growth Director'],
    topics: ['Leadership', 'Strategy', 'Change Management', 'M&A', 'Digital Growth'],
    keywords: ['Executive Briefing', 'Strategic Planning', 'Decision Intelligence', 'Growth Strategy', 'Market Expansion'],
    donut: {
      jobLevel: [20, 24, 20, 16, 20],
      companySize: [18, 18, 18, 14, 16, 16],
      annualRevenue: [24, 22, 18, 16, 12, 8],
    },
  },
  'supply-chain': {
    audienceSize: [5, 22],
    openBase: 21,
    ctrBase: 8.2,
    downloadBase: [280, 340, 310, 360],
    engagementBase: [210, 250, 235, 280],
    jobTitles: ['Logistics Director', 'Supply Chain Manager', 'Procurement Lead', 'Operations Planner', 'Warehouse Director'],
    topics: ['Logistics Optimization', 'Inventory Management', 'Procurement', 'Sustainability', 'Demand Planning'],
    keywords: ['Supplier Risk', 'Inventory Forecasting', 'Logistics Automation', 'Freight Strategy', 'Supply Analytics'],
    donut: {
      jobLevel: [14, 24, 22, 18, 22],
      companySize: [16, 20, 18, 14, 16, 16],
      annualRevenue: [22, 22, 20, 16, 12, 8],
    },
  },
  'learning-and-development': {
    audienceSize: [0.8, 7.2],
    openBase: 17,
    ctrBase: 6.8,
    downloadBase: [140, 170, 155, 185],
    engagementBase: [130, 155, 145, 170],
    jobTitles: ['L&D Manager', 'Training Director', 'Learning Architect', 'Organizational Development Lead', 'Talent Coach'],
    topics: ['Employee Training', 'Microlearning', 'Leadership Development', 'Skills Growth', 'Learning Culture'],
    keywords: ['Learning Experience', 'Skills Development', 'Training ROI', 'Course Adoption', 'Performance Support'],
    donut: {
      jobLevel: [28, 26, 18, 12, 16],
      companySize: [22, 20, 16, 12, 16, 14],
      annualRevenue: [20, 18, 18, 16, 14, 14],
    },
  },
  'customer-experience': {
    audienceSize: [3.5, 18],
    openBase: 23,
    ctrBase: 8.8,
    downloadBase: [260, 320, 290, 340],
    engagementBase: [210, 250, 230, 275],
    jobTitles: ['CX Director', 'Customer Success Manager', 'Experience Designer', 'Support Operations Lead', 'Voice of Customer Lead'],
    topics: ['Customer Journey', 'Retention', 'Feedback Programs', 'Experience Design', 'Loyalty'],
    keywords: ['Customer Insights', 'NPS', 'Retention Strategy', 'Feedback Loops', 'Experience Analytics'],
    donut: {
      jobLevel: [16, 24, 22, 18, 20],
      companySize: [18, 20, 18, 14, 16, 14],
      annualRevenue: [22, 22, 18, 16, 12, 10],
    },
  },
  others: {
    audienceSize: [6, 24],
    openBase: 20,
    ctrBase: 8,
    downloadBase: [320, 360, 330, 380],
    engagementBase: [200, 240, 220, 270],
    jobTitles: ['Strategy Lead', 'Operations Manager', 'Field Director', 'Innovation Lead', 'Program Manager'],
    topics: ['Business Operations', 'Vendor Management', 'Field Execution', 'Innovation', 'Compliance'],
    keywords: ['Operational Efficiency', 'Field Enablement', 'Vendor Strategy', 'Process Optimization', 'Market Reach'],
    donut: {
      jobLevel: [18, 22, 22, 18, 20],
      companySize: [18, 20, 18, 14, 14, 16],
      annualRevenue: [24, 20, 18, 16, 12, 10],
    },
  },
};

const buildCategoryData = (slug) => {
  const profile = categoryProfiles[slug] || categoryProfiles.marketing;

  const audienceSize = parseFloat(randomBetween(profile.audienceSize[0], profile.audienceSize[1]).toFixed(2));

  return {
    name: categorySlugToLabel[slug] || profile.label || slug,
    headline: categorySlugToLabel[slug] || profile.label || slug,
    audienceSize,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: buildDonut(profile.donut.jobLevel),
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: buildDonut(profile.donut.companySize),
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: buildDonut(profile.donut.annualRevenue),
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: trendLabels,
        values: buildTrend(profile.openBase, 5, 1.5),
        avg: parseFloat(randomBetween(profile.openBase - 1, profile.openBase + 2).toFixed(1)),
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: trendLabels,
        values: buildTrend(profile.ctrBase, 2.5, 0.8, 4, 18),
        avg: parseFloat(randomBetween(profile.ctrBase - 0.5, profile.ctrBase + 1.5).toFixed(1)),
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: barLabels,
        values: profile.downloadBase.map((value) => value + randomIntBetween(-25, 25)),
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: barLabels,
        values: profile.engagementBase.map((value) => value + randomIntBetween(-22, 22)),
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: profile.jobTitles,
      topTopics: profile.topics,
      topKeywords: profile.keywords,
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  };
};

export const audienceData = {
  marketing: {
    name: 'Marketing',
    headline: 'Marketing',
    audienceSize: 28.7,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [19.74, 27.63, 19.74, 19.74, 13.16],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [10, 18, 18, 18, 18, 18],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [15, 20, 25, 20, 15, 5],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['VP of Marketing', 'Demand Gen Lead', 'Content Director', 'Growth Strategist', 'Brand Manager'],
      topTopics: ['ABM', 'Pipeline Acceleration', 'Demand Gen', 'Channel Activation', 'Content Syndication'],
      topKeywords: ['Intent Data', 'Sponsored Email', 'ABM Lists', 'Purchase Signals', 'Campaign ROI'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  sales: {
    name: 'Sales',
    headline: 'Sales',
    audienceSize: 29.4,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [14.46, 30.12, 21.69, 24.10, 9.64],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [8.0, 15.0, 22.0, 20.0, 18.0, 17.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [20.0, 24.0, 22.0, 16.0, 11.11, 5.56],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['Sales Director', 'Account Executive', 'Revenue Ops Lead', 'Business Development Manager', 'Inside Sales Manager'],
      topTopics: ['Sales Enablement', 'Pipeline Growth', 'ABX', 'Deal Velocity', 'CRM Adoption'],
      topKeywords: ['Sales Triggers', 'Lead Qualification', 'Opportunity Scoring', 'Deal Intelligence', 'Outreach Cadence'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  'human-resources': {
    name: 'Human Resources',
    headline: 'Human Resources',
    audienceSize: 19.2,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [12.5, 37.5, 25.69, 18.75, 6.25],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [12.0, 18.0, 25.0, 20.0, 15.0, 10.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [21.05, 26.32, 21.05, 15.79, 10.53, 5.26],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['HR Director', 'Talent Acquisition Lead', 'People Ops Manager', 'Chief HR Officer', 'L&D Specialist'],
      topTopics: ['Employee Experience', 'Workplace Culture', 'Talent Retention', 'Diversity & Inclusion', 'Performance Management'],
      topKeywords: ['HR Technology', 'Employee Engagement', 'Recruitment Marketing', 'Career Mobility', 'Culture Strategy'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  'information-technology': {
    name: 'Information Technology',
    headline: 'Information Technology',
    audienceSize: 49.8,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [12.0, 28.5, 22.69, 18.0, 20.0],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [15.0, 20.0, 22.0, 18.0, 15.0, 10.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [18.0, 22.0, 24.0, 20.0, 12.0, 4.0],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['CTO', 'IT Director', 'Cloud Architect', 'Security Manager', 'Network Operations Lead'],
      topTopics: ['Cloud Migration', 'Security', 'DevOps', 'Infrastructure', 'Data Strategy'],
      topKeywords: ['Digital Transformation', 'Cybersecurity', 'Hybrid Cloud', 'Network Automation', 'Data Integration'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  finance: {
    name: 'Finance',
    headline: 'Finance',
    audienceSize: 13.3,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [10.0, 25.0, 20.0, 25.0, 20.0],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [12.0, 18.0, 20.0, 18.0, 18.0, 14.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [20.0, 22.0, 23.0, 18.0, 12.0, 5.0],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['CFO', 'Finance Director', 'FP&A Manager', 'Risk Officer', 'Treasury Lead'],
      topTopics: ['Financial Planning', 'Risk Management', 'Automation', 'Reporting', 'Compliance'],
      topKeywords: ['Financial Analytics', 'Cash Flow', 'Expense Optimization', 'RegTech', 'Treasury Management'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  'business-leaders': {
    name: 'Business Leaders',
    headline: 'Business Leaders',
    audienceSize: 3.1,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [5.0, 15.0, 25.0, 20.0, 35.0],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [20.0, 18.0, 15.0, 12.0, 20.0, 15.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [25.0, 22.0, 18.0, 15.0, 10.0, 10.0],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['CEO', 'COO', 'Managing Director', 'Strategy Lead', 'Business Growth Director'],
      topTopics: ['Leadership', 'Strategy', 'Change Management', 'M&A', 'Digital Growth'],
      topKeywords: ['Executive Briefing', 'Strategic Planning', 'Decision Intelligence', 'Growth Strategy', 'Market Expansion'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  'supply-chain': {
    name: 'Supply Chain',
    headline: 'Supply Chain',
    audienceSize: 2.3,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [8.0, 22.0, 30.0, 20.0, 20.0],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [15.0, 20.0, 18.0, 14.0, 18.0, 15.0],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [22.0, 20.0, 24.0, 16.0, 12.0, 6.0],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['Logistics Director', 'Supply Chain Manager', 'Procurement Lead', 'Operations Planner', 'Warehouse Director'],
      topTopics: ['Logistics Optimization', 'Inventory Management', 'Procurement', 'Sustainability', 'Demand Planning'],
      topKeywords: ['Supplier Risk', 'Inventory Forecasting', 'Logistics Automation', 'Freight Strategy', 'Supply Analytics'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  'learning-and-development': buildCategoryData('learning-and-development'),
  'customer-experience': {
    name: 'Customer Experience',
    headline: 'Customer Experience',
    audienceSize: 0.9,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [12.00, 23.00, 21.00, 22.00, 22.00],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [14.00, 17.00, 21.00, 16.00, 19.00, 13.00],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [19.00, 23.00, 22.00, 17.00, 14.00, 5.00],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: ['CX Director', 'Customer Success Manager', 'Experience Designer', 'Support Operations Lead', 'Voice of Customer Lead'],
      topTopics: ['Customer Journey', 'Retention', 'Feedback Programs', 'Experience Design', 'Loyalty'],
      topKeywords: ['Customer Insights', 'NPS', 'Retention Strategy', 'Feedback Loops', 'Experience Analytics'],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
  others: {
    name: 'Others',
    headline: 'Others',
    audienceSize: 15.3,
    donut: {
      jobLevel: {
        labels: ['Non-Manager', 'Manager', 'Director', 'VP', 'C-Level'],
        values: [17.65, 29.41, 23.53, 17.65, 11.76],
        colors: ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444'],
      },
      companySize: {
        labels: ['1–19', '20–49', '50–499', '500–999', '1000–4999', '5000+'],
        values: [11.11, 16.67, 22.22, 22.22, 16.67, 11.11],
        colors: ['#A5B4FC', '#6EE7B7', '#FBBF24', '#F97316', '#2DD4BF', '#F472B6'],
      },
      annualRevenue: {
        labels: ['$1M–$9M', '$10M–$99M', '$100M–$499M', '$500M–$999M', '$1B–$5B', '$5B+'],
        values: [15.0, 20.0, 25.0, 20.0, 15.0, 5.0],
        colors: ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#FB7185', '#FBBF24'],
      },
    },
    line: {
      openRate: {
        label: 'Open Rate',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [15, 25, 20, 35, 30],
        avg: 25,
        color: '#3B82F6',
      },
      ctr: {
        label: 'CTR',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        values: [10, 20, 15, 30, 25],
        avg: 20,
        color: '#10B981',
      },
    },
    bar: {
      downloads: {
        label: 'Content Downloads',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [100, 300, 200, 500, 400, 450],
        color: '#F97316',
      },
      engagements: {
        label: 'Multi Engagements',
        labels: ['5', '20', '35', '50', '65', '80'],
        values: [5, 15, 10, 25, 20, 18],
        color: '#6366F1',
      },
    },
    stats: {
      topJobTitles: [
        'Strategy Lead',
        'Operations Manager',
        'Field Director',
        'Innovation Lead',
        'Program Manager',
      ],
      topTopics: [
        'Business Operations',
        'Vendor Management',
        'Field Execution',
        'Innovation',
        'Compliance',
      ],
      topKeywords: [
        'Operational Efficiency',
        'Field Enablement',
        'Vendor Strategy',
        'Process Optimization',
        'Market Reach',
      ],
    },
    regions: [
      { label: 'North America', value: '65%' },
      { label: 'Asia Pacific', value: '12%' },
      { label: 'South America', value: '14%' },
      { label: 'Australia and New Zealand', value: '3%' },
    ],
  },
};

// DEFAULT EXPORT - This makes the component available for import in App.js
const AudienceData = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Audience Data Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audienceCategories.map((category) => {
          const data = audienceData[category.slug];
          if (!data) return null;
          
          return (
            <div key={category.slug} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
              <p className="text-gray-600 mb-4">
                Audience Size: {data.audienceSize}%
              </p>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Top Job Titles:</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {data.stats?.topJobTitles?.slice(0, 3).map((title, idx) => (
                    <li key={idx}>{title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Top Topics:</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {data.stats?.topTopics?.slice(0, 3).map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AudienceData;