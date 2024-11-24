import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Partners from './components/Partners';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminServices from './components/admin/AdminServices';
import AdminMessages from './components/admin/AdminMessages';
import AdminUsers from './components/admin/AdminUsers';
import ProtectedRoute from './components/admin/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import './i18n/config';
import { AuthProvider } from './contexts/AuthContext';
import AdminProjects from './components/admin/AdminProjects';
import NotificationContainer from './components/common/NotificationContainer';
import AdminQuoteRequests from './components/admin/AdminQuoteRequests';
import AdminPartners from './components/admin/AdminPartners';
import ServiceDetails from './components/ServiceDetails';
import TopBar from './components/TopBar';
import Quote from './components/Quote';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600">Something went wrong:</h2>
        <pre className="mt-2 text-sm text-gray-500">{error.message}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <AuthProvider>
          <Router>
            <NotificationContainer />
            <Routes>
              <Route path="/" element={
                <div className="min-h-screen">
                  <TopBar />
                  <Navbar />
                  <Hero />
                  <Stats />
                  <About />
                  <Services />
                  <Projects />
                  <Partners />
                  <Contact />
                  <Footer />
                </div>
              } />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quote" element={<Quote />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="partners" element={<AdminPartners />} />
                <Route path="quotes" element={<AdminQuoteRequests />} />
              </Route>
              <Route path="/services/:id" element={
                <>
                  <TopBar />
                  <Navbar />
                  <ServiceDetails />
                  <Footer />
                </>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;