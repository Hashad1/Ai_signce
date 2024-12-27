'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">عذراً، حدث خطأ ما</h2>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.'}
            </p>
            <Button onClick={this.handleReset}>
              حاول مرة أخرى
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 