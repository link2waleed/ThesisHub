// ── Core Types for ThesisHub ──

export type UserRole = 'student' | 'university' | 'company';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    university?: string;
    company?: string;
    field?: string;
    bio?: string;
    location?: string;
    website?: string;
    createdAt: string;
}

export interface Organization {
    id: string;
    name: string;
    type: 'university' | 'company';
    logo: string;
    coverImage?: string;
    description: string;
    website: string;
    location: string;
    employeeCount?: string;
    founded?: string;
    industries?: string[];
}

export interface Thesis {
    id: string;
    title: string;
    organization: Organization;
    description: string;
    shortDescription: string;
    field: string;
    tags: string[];
    location: string;
    duration: string;
    compensation: 'paid' | 'unpaid' | 'stipend';
    type: 'onsite' | 'remote' | 'hybrid';
    postedAt: string;
    deadline?: string;
    externalUrl: string;
    featured?: boolean;
    requirements?: string[];
    responsibilities?: string[];
}

export interface ThesisIdea {
    id: string;
    title: string;
    abstract: string;
    shortAbstract: string;
    field: string;
    tags: string[];
    author: {
        id: string;
        name: string;
        university: string;
        avatar?: string;
    };
    fundingInterest: 'seeking' | 'open' | 'not-needed';
    postedAt: string;
    featured?: boolean;
    likes?: number;
}

export interface GraduateInternship {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    duration: string;
    employmentType: 'Internship';
    field: string;
    tags: string[];
    description: string;
    requirements?: string[];
    postedAt: string;
    applyUrl: string;
    featured?: boolean;
}

export interface FilterState {
    search: string;
    field: string[];
    location: string[];
    duration: string[];
    compensation: string[];
    organizationType: string[];
    workType: string[];
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    organization: string;
    avatar?: string;
    quote: string;
}

// ── Filter Options ──
export const FIELDS = [
    'Computer Science',
    'Engineering',
    'Business & Economics',
    'Life Sciences',
    'Social Sciences',
    'Environmental Science',
    'Data Science & AI',
    'Design & Architecture',
    'Law',
    'Medicine & Health',
] as const;

export const LOCATIONS = [
    'Stockholm',
    'Gothenburg',
    'Malmö',
    'Uppsala',
    'Lund',
    'London',
    'Berlin',
    'Amsterdam',
    'Remote',
] as const;

export const DURATIONS = [
    '3 months',
    '6 months',
    '9 months',
    '12 months',
] as const;

export const COMPENSATION_TYPES = ['paid', 'unpaid', 'stipend'] as const;
export const ORG_TYPES = ['university', 'company'] as const;
export const WORK_TYPES = ['onsite', 'remote', 'hybrid'] as const;
