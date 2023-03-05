interface LinkToApiProps {
  url: string;
}

export default function LinkToApi({ url }: LinkToApiProps) {
  return (
    <button
      className="badge text-bg-secondary btn me-1"
      type="button"
      onClick={() => {
        window.open(url, '_blank')?.focus();
      }}
      title="Go to the API"
    >
      {url.slice(34)}
    </button>
  );
}
