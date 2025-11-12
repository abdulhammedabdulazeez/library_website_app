type EventsEmptyStateProps = {
  title: string;
  message: string;
};

export const EventsEmptyState = ({
  title,
  message,
}: EventsEmptyStateProps) => {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
        {message}
      </p>
    </div>
  );
};

