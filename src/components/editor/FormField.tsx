import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const labelClass = 'block text-xs font-medium text-slate-500 mb-1';
const inputClass =
  'w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, className, ...rest }: TextFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input className={`${inputClass} ${className ?? ''}`} {...rest} />
    </label>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({ label, className, ...rest }: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea className={`${inputClass} ${className ?? ''}`} {...rest} />
    </label>
  );
}
