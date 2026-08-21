interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = 'Something went wrong. Please try again later.',
}: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state__message">{message}</p>
    </div>
  );
}
