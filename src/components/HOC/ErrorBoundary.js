import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p className="text-primary fs-4 text-center">
            Oops! Something went wrong.
          </p>
          <p className="text-primary fs-5 text-center">
            We're sorry, but we encountered a problem loading the "
            {this.props.componentName}". Please try refreshing the page. If the
            issue persists, please contact our support team or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
