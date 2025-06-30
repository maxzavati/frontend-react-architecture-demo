interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
  message?: string;
}

export const extractErrorMessage = (error: ErrorResponse): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unknown error occurred';
};

export function isErrorWithStatus(
  error: unknown,
  statusCode: number
): error is { status: number } {
  return (
    error != null &&
    typeof error === 'object' &&
    'status' in error &&
    (error as { status: unknown }).status === statusCode
  );
}
