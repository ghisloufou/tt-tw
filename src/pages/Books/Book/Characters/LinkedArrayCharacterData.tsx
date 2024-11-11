import { LinkToApi } from './LinkToApi';

export function LinkedArrayCharacterData({
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
        {values.length
          ? values.map((value) => <LinkToApi key={value} url={value} />)
          : 'Unknown'}
      </span>
    </div>
  );
}
