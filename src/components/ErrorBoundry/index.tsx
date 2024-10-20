import { Component, ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: '#3b361c',
            fontWeight: 600,
          }}
        >
          Something went wrong. Please Try Again Later
        </div>
      );
    }
    return this.props.children;
  }
}
