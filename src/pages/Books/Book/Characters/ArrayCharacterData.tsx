export function ArrayCharacterData({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="character-data">
      <span>{label}</span>
      <span style={{ color: values.length ? '' : 'grey' }}>
        {values.length ? values.join(', ') : 'Unknown'}
      </span>
    </div>
  );
}
