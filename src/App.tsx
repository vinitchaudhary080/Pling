import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/error-boundary'
import { AppearanceProvider } from './features/dashboard/appearance-provider'
import { ActivityPage } from './features/activity/activity-page'
import { MapPage } from './features/activity/map-page'
import { DashboardPage } from './features/dashboard/dashboard-page'
import { InsightsPage } from './features/insights/insights-page'
import { OnboardingPage } from './features/onboarding/onboarding-page'

/**
 * Route table mirroring the Figma flow:
 * onboarding -> dashboard -> activity tracking -> expanded map, with the
 * API-backed Daily Reports screen hanging off the dashboard.
 */
export const App = () => (
  <ErrorBoundary>
    <AppearanceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </Router>
    </AppearanceProvider>
  </ErrorBoundary>
)
