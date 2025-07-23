// src/components/ErrorBoundary.jsx
// Pastikan ini ada dan isinya seperti yang saya berikan sebelumnya
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Oops! Terjadi Kesalahan.</h1>
          <p className="text-lg mb-4">
            Ada sesuatu yang tidak beres. Mohon maaf atas ketidaknyamanan ini.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Refresh Halaman
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 p-4 bg-red-100 rounded-md text-left max-w-xl overflow-auto text-sm">
              <summary>Detail Error</summary>
              <pre className="whitespace-pre-wrap break-words">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;