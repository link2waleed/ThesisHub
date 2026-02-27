import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Navbar, Footer, AuthLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminRoute } from '@/components/AdminRoute';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

// ── Lazy-loaded pages ──
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const ThesisFeed = lazy(() => import('@/features/thesis/ThesisFeed'));
const ThesisDetail = lazy(() => import('@/features/thesis/ThesisDetail'));
// TEMPORARILY DISABLED: Thesis Ideas module (client request)
// const IdeasFeed = lazy(() => import('@/features/ideas/IdeasFeed'));
// const IdeaDetail = lazy(() => import('@/features/ideas/IdeaDetail'));

// Graduate Internships module
const InternshipFeed = lazy(() => import('@/features/internships/InternshipFeed'));
const InternshipDetail = lazy(() => import('@/features/internships/InternshipDetail'));
const AboutPage = lazy(() => import('@/features/about/AboutPage'));
const NotFoundPage = lazy(() => import('@/features/notfound/NotFoundPage'));

// Auth pages
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const SignUpPage = lazy(() => import('@/features/auth/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/ResetPasswordPage'));

// Dashboard pages
const DashboardLayout = lazy(() => import('@/features/dashboard/DashboardLayout'));
const DashboardOverview = lazy(() => import('@/features/dashboard/DashboardOverview'));
const ProfilePage = lazy(() => import('@/features/dashboard/ProfilePage'));
const SettingsPage = lazy(() => import('@/features/dashboard/SettingsPage'));
const NotificationsPage = lazy(() => import('@/features/dashboard/NotificationsPage'));
const StudentDashboard = lazy(() => import('@/features/dashboard/StudentDashboard'));
const UniversityDashboard = lazy(() => import('@/features/dashboard/UniversityDashboard'));
const CompanyDashboard = lazy(() => import('@/features/dashboard/CompanyDashboard'));

// Phase 5 – Profile & Bookmarks pages
const OrganizationProfile = lazy(() => import('@/features/organization/OrganizationProfile'));
const PublicProfile = lazy(() => import('@/features/profile/PublicProfile'));
const BookmarksPage = lazy(() => import('@/features/bookmarks/BookmarksPage'));

// Utility pages
const ContactPage = lazy(() => import('@/features/utility/ContactPage'));
const FAQPage = lazy(() => import('@/features/utility/FAQPage'));
const PricingPage = lazy(() => import('@/features/utility/PricingPage'));
const TermsPage = lazy(() => import('@/features/utility/TermsPage'));
const PrivacyPage = lazy(() => import('@/features/utility/PrivacyPage'));

// Blog pages
const BlogListing = lazy(() => import('@/features/blog/BlogListing'));
const BlogDetail = lazy(() => import('@/features/blog/BlogDetail'));

// Admin pages
const AdminLayout = lazy(() => import('@/features/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/features/admin/pages/AdminDashboard'));
const AdminThesis = lazy(() => import('@/features/admin/pages/AdminThesis'));
const AdminInternships = lazy(() => import('@/features/admin/pages/AdminInternships'));
const AdminUsers = lazy(() => import('@/features/admin/pages/AdminUsers'));
const AdminApprovals = lazy(() => import('@/features/admin/pages/AdminApprovals'));
const AdminAnalytics = lazy(() => import('@/features/admin/pages/AdminAnalytics'));
const AdminReports = lazy(() => import('@/features/admin/pages/AdminReports'));
const AdminSettings = lazy(() => import('@/features/admin/pages/AdminSettings'));

// ── Query Client ──
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// ── Scroll Restoration ──
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Page Loading ──
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ── Layout ──
function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// ── App ──
export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);
  useEffect(() => { restoreSession(); }, [restoreSession]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main app routes */}
              <Route element={<RootLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/thesis" element={<ThesisFeed />} />
                <Route path="/thesis/:id" element={<ThesisDetail />} />
                {/* TEMPORARILY DISABLED: Thesis Ideas routes */}
                {/* <Route path="/ideas" element={<IdeasFeed />} /> */}
                {/* <Route path="/ideas/:id" element={<IdeaDetail />} /> */}

                {/* Graduate Internships */}
                <Route path="/internships" element={<InternshipFeed />} />
                <Route path="/internships/:id" element={<InternshipDetail />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/organization/:id" element={<OrganizationProfile />} />
                <Route path="/profile/:id" element={<PublicProfile />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Dashboard routes (protected — must be logged in) */}
              <Route element={<RootLayout />}>
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<DashboardOverview />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="student" element={<StudentDashboard />} />
                  <Route path="university" element={<UniversityDashboard />} />
                  <Route path="company" element={<CompanyDashboard />} />
                </Route>
              </Route>

              {/* Admin routes (protected — admin role only) */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="thesis" element={<AdminThesis />} />
                <Route path="internships" element={<AdminInternships />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="approvals" element={<AdminApprovals />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Auth routes (separate layout) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
