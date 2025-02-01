import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '@/shared/types/errorTypes';
import { Component, ErrorInfo } from 'react';

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.customError = this.customError.bind(this);
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  customError() {
    this.setState({ hasError: true });
    this.forceUpdate();
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('customError', this.customError);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('customError', this.customError);
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
