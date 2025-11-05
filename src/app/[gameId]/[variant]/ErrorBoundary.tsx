import { Component, ReactNode } from "react";
import { UnExpectedError } from "@/ui/UnExpectedError";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Board error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <UnExpectedError onReset={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}
