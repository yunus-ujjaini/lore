interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  onReset: () => void;
}

export default function EmptyState({
  message = 'No Entries Found',
  subMessage = 'Even the most thorough bestiary has its limits.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__message">{message}</p>
      <p className="empty-state__sub">{subMessage}</p>
      <button
        className="empty-state__reset"
        onClick={onReset}
        type="button"
        aria-label="Reset filters"
      >
        Reset Filters
      </button>
    </div>
  );
}
