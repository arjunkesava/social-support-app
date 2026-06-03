import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import type { WithTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";

import { errorContainer } from "./styles";
import type { ErrorBoundaryProps } from "./types";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps & WithTranslation,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps & WithTranslation) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <Box sx={errorContainer}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {t("error_boundary.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {this.state.error?.message || t("error_boundary.default_message")}
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            {t("error_boundary.retry")}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithTranslation = withTranslation()(ErrorBoundary);

export { ErrorBoundaryWithTranslation as ErrorBoundary };
export default ErrorBoundaryWithTranslation;
