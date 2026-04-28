import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{
            padding: "2rem",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            color: "#856404"
          }}>
            <h2>Failed to load micro frontend</h2>
            <p>The remote module could not be loaded. Please ensure:</p>
            <ul>
              <li>The remote application is running</li>
              <li>The remote entry URL is correct</li>
              <li>There are no network connectivity issues</li>
            </ul>
            <details>
              <summary>Error details</summary>
              <pre style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f8f9fa" }}>
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
