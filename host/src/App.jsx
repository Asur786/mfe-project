import React, { Suspense, lazy } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

const DashboardApp = lazy(() => import("dashboard/DashboardApp"));
const SettingsApp = lazy(() => import("settings/SettingsApp"));
const ProfileApp = lazy(() => import("profile/ProfileApp"));
const ServicesApp = lazy(() => import("services/ServicesApp"));
const PrivacyPolicyApp = lazy(() => import("privacyPolicy/PrivacyPolicyApp"));

const App = () => {
  return (
    <div className="host-app">
      <header className="host-header">
        <h1>MFE Host Shell</h1>
        <span className="host-badge">Module Federation Demo</span>
      </header>

      <main className="host-content">
        <Suspense fallback={<div className="loading">Loading micro frontend...</div>}>
          <ErrorBoundary>
            <DashboardApp />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<div className="loading">Loading micro frontend...</div>}>
          <ErrorBoundary>
            <SettingsApp />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<div className="loading">Loading micro frontend...</div>}>
          <ErrorBoundary>
            <ProfileApp />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<div className="loading">Loading micro frontend...</div>}>
          <ErrorBoundary>
            <ServicesApp />
          </ErrorBoundary>
        </Suspense>

        <hr style={{ margin: "2rem 0", border: "none", borderTop: "2px solid #e0e0e0" }} />

        <Suspense fallback={<div className="loading">Loading Privacy Policy...</div>}>
          <ErrorBoundary>
            <PrivacyPolicyApp />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
