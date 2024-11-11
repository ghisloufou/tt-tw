import { LinkToApi } from './LinkToApi';

StringCharacterData.defaultProps = { isUrlValue: false };

export function StringCharacterData({
  label,
  value,
  isUrlValue,
}: {
  label: string;
  value: string;
  isUrlValue?: boolean;
}) {
  const displayedValue = isUrlValue ? <LinkToApi url={value} /> : value;
  return (
    <div className="character-data">
      <span>{label}</span>
      <span style={{ color: value ? '' : 'grey' }}>
        {value ? displayedValue : 'Unknown'}
      </span>
    </div>
  );
}
