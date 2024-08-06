export interface FieldConfig {
  key: string;
  label: string;
  hidden: boolean;
  type: 'text' | 'dropdown';
  options?: { label: string; value: string | number }[];
}
