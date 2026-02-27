// ── Admin Panel Mock Data ──

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'company' | 'university';
    status: 'active' | 'suspended';
    avatar?: string;
    registeredAt: string;
    organization?: string;
}

export interface AdminThesisItem {
    id: string;
    title: string;
    organization: string;
    location: string;
    field: string;
    status: 'published' | 'draft' | 'pending' | 'rejected';
    createdBy: 'admin' | 'company' | 'university';
    createdAt: string;
    applicants: number;
}

export interface AdminInternshipItem {
    id: string;
    title: string;
    company: string;
    location: string;
    field: string;
    status: 'published' | 'draft' | 'pending' | 'rejected';
    createdBy: 'admin' | 'company' | 'university';
    createdAt: string;
    applicants: number;
}

export interface ReportItem {
    id: string;
    type: 'user' | 'thesis' | 'internship';
    targetName: string;
    reason: string;
    reportedBy: string;
    reportedAt: string;
    status: 'pending' | 'resolved' | 'ignored';
}

// ── Users ──
export const adminUsers: AdminUser[] = [
    { id: 'u1', name: 'Emma Lindström', email: 'emma.l@kth.se', role: 'student', status: 'active', registeredAt: '2025-11-04', organization: 'KTH Royal Institute' },
    { id: 'u2', name: 'Oscar Nyberg', email: 'oscar.n@lu.se', role: 'student', status: 'active', registeredAt: '2025-10-20', organization: 'Lund University' },
    { id: 'u3', name: 'Sofia Bergström', email: 'sofia.b@uu.se', role: 'student', status: 'active', registeredAt: '2025-12-01', organization: 'Uppsala University' },
    { id: 'u4', name: 'Alexander Holm', email: 'alex.h@chalmers.se', role: 'student', status: 'active', registeredAt: '2025-09-15', organization: 'Chalmers University' },
    { id: 'u5', name: 'Ericsson AB', email: 'hr@ericsson.com', role: 'company', status: 'active', registeredAt: '2025-08-10' },
    { id: 'u6', name: 'Volvo Group', email: 'recruit@volvo.com', role: 'company', status: 'active', registeredAt: '2025-07-22' },
    { id: 'u7', name: 'Spotify Technology', email: 'jobs@spotify.com', role: 'company', status: 'active', registeredAt: '2025-09-01' },
    { id: 'u8', name: 'IKEA Group', email: 'talent@ikea.com', role: 'company', status: 'suspended', registeredAt: '2025-06-14' },
    { id: 'u9', name: 'KTH Royal Institute', email: 'admin@kth.se', role: 'university', status: 'active', registeredAt: '2025-05-01' },
    { id: 'u10', name: 'Lund University', email: 'admin@lu.se', role: 'university', status: 'active', registeredAt: '2025-05-10' },
    { id: 'u11', name: 'Karolinska Institutet', email: 'admin@ki.se', role: 'university', status: 'active', registeredAt: '2025-06-01' },
    { id: 'u12', name: 'Uppsala University', email: 'admin@uu.se', role: 'university', status: 'active', registeredAt: '2025-04-20' },
    { id: 'u13', name: 'Nora Ekström', email: 'nora.e@gmail.com', role: 'student', status: 'suspended', registeredAt: '2025-11-28' },
    { id: 'u14', name: 'SEB Bank', email: 'hr@seb.se', role: 'company', status: 'active', registeredAt: '2025-10-05' },
];

// ── Thesis ──
export const adminTheses: AdminThesisItem[] = [
    { id: 't1', title: 'Machine Learning for Early Cancer Detection Using Genomic Data', organization: 'Karolinska Institutet', location: 'Stockholm', field: 'Data Science & AI', status: 'published', createdBy: 'university', createdAt: '2025-12-01', applicants: 24 },
    { id: 't2', title: '5G Network Optimization Through Reinforcement Learning', organization: 'Ericsson', location: 'Stockholm', field: 'Computer Science', status: 'published', createdBy: 'company', createdAt: '2025-11-28', applicants: 18 },
    { id: 't3', title: 'Sustainable Urban Transport Modeling', organization: 'KTH Royal Institute', location: 'Stockholm', field: 'Engineering', status: 'published', createdBy: 'university', createdAt: '2025-11-20', applicants: 12 },
    { id: 't4', title: 'Blockchain-Based Supply Chain Verification', organization: 'Volvo Group', location: 'Gothenburg', field: 'Computer Science', status: 'pending', createdBy: 'company', createdAt: '2025-12-10', applicants: 0 },
    { id: 't5', title: 'AI-Powered Climate Change Prediction Models', organization: 'Lund University', location: 'Lund', field: 'Environmental Science', status: 'pending', createdBy: 'university', createdAt: '2025-12-12', applicants: 0 },
    { id: 't6', title: 'NLP for Swedish Healthcare Records', organization: 'Karolinska Institutet', location: 'Stockholm', field: 'Data Science & AI', status: 'published', createdBy: 'admin', createdAt: '2025-11-15', applicants: 31 },
    { id: 't7', title: 'Autonomous Drone Navigation in GPS-Denied Environments', organization: 'KTH Royal Institute', location: 'Stockholm', field: 'Engineering', status: 'draft', createdBy: 'admin', createdAt: '2025-12-14', applicants: 0 },
    { id: 't8', title: 'Privacy-Preserving Federated Learning', organization: 'Spotify Technology', location: 'Stockholm', field: 'Computer Science', status: 'rejected', createdBy: 'company', createdAt: '2025-11-05', applicants: 0 },
];

// ── Internships ──
export const adminInternships: AdminInternshipItem[] = [
    { id: 'i1', title: 'Machine Learning Engineering Intern', company: 'Spotify Technology', location: 'Stockholm', field: 'Data Science & AI', status: 'published', createdBy: 'company', createdAt: '2025-12-01', applicants: 42 },
    { id: 'i2', title: 'Software Development Intern', company: 'Ericsson', location: 'Stockholm', field: 'Computer Science', status: 'published', createdBy: 'company', createdAt: '2025-11-20', applicants: 35 },
    { id: 'i3', title: 'UX Research Intern', company: 'IKEA Group', location: 'Malmö', field: 'Design & Architecture', status: 'published', createdBy: 'company', createdAt: '2025-11-15', applicants: 19 },
    { id: 'i4', title: 'Data Analytics Graduate Program', company: 'SEB Bank', location: 'Stockholm', field: 'Business & Economics', status: 'pending', createdBy: 'company', createdAt: '2025-12-10', applicants: 0 },
    { id: 'i5', title: 'Cloud Infrastructure Intern', company: 'Volvo Group', location: 'Gothenburg', field: 'Computer Science', status: 'pending', createdBy: 'company', createdAt: '2025-12-12', applicants: 0 },
    { id: 'i6', title: 'AI Research Intern', company: 'Ericsson', location: 'Lund', field: 'Data Science & AI', status: 'published', createdBy: 'admin', createdAt: '2025-11-10', applicants: 28 },
    { id: 'i7', title: 'Product Design Intern', company: 'Spotify Technology', location: 'Stockholm', field: 'Design & Architecture', status: 'draft', createdBy: 'admin', createdAt: '2025-12-14', applicants: 0 },
];

// ── Reports ──
export const adminReports: ReportItem[] = [
    { id: 'r1', type: 'thesis', targetName: 'Privacy-Preserving Federated Learning', reason: 'Misleading description', reportedBy: 'emma.l@kth.se', reportedAt: '2025-12-08', status: 'pending' },
    { id: 'r2', type: 'user', targetName: 'Nora Ekström', reason: 'Spam applications', reportedBy: 'hr@ericsson.com', reportedAt: '2025-12-06', status: 'pending' },
    { id: 'r3', type: 'internship', targetName: 'Cloud Infrastructure Intern', reason: 'Duplicate listing', reportedBy: 'oscar.n@lu.se', reportedAt: '2025-12-09', status: 'pending' },
    { id: 'r4', type: 'user', targetName: 'IKEA Group', reason: 'Inactive company profile', reportedBy: 'admin@kth.se', reportedAt: '2025-11-30', status: 'resolved' },
];

// ── Analytics Chart Data ──
export const analyticsData = {
    userGrowth: [
        { month: 'Jul', students: 820, companies: 45, universities: 18 },
        { month: 'Aug', students: 1240, companies: 62, universities: 24 },
        { month: 'Sep', students: 2800, companies: 88, universities: 35 },
        { month: 'Oct', students: 5100, companies: 120, universities: 48 },
        { month: 'Nov', students: 8400, companies: 170, universities: 62 },
        { month: 'Dec', students: 12500, companies: 230, universities: 85 },
    ],
    thesisPosted: [
        { month: 'Jul', count: 32 },
        { month: 'Aug', count: 58 },
        { month: 'Sep', count: 95 },
        { month: 'Oct', count: 164 },
        { month: 'Nov', count: 290 },
        { month: 'Dec', count: 420 },
    ],
    internshipPosted: [
        { month: 'Jul', count: 18 },
        { month: 'Aug', count: 34 },
        { month: 'Sep', count: 62 },
        { month: 'Oct', count: 98 },
        { month: 'Nov', count: 145 },
        { month: 'Dec', count: 210 },
    ],
};

// ── Dashboard Stats ──
export const dashboardStats = {
    totalThesis: 420,
    totalInternships: 210,
    totalStudents: 12500,
    totalCompanies: 230,
    totalUniversities: 85,
    pendingApprovals: 4,
};
