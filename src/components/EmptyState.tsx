interface EmptyStateProps {
  message?: string;
  onReset: () => void;
}

export default function EmptyState({
  message = 'No monsters found',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__message">{message}</p>
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
