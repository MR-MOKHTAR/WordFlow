import { memo } from "react";
import useFont from "../contexts/FontModal/useFont";

type SelectFieldType = {
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

function SelectField({ id, value, onChange, options }: SelectFieldType) {
  const { fontFamily } = useFont();
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="fs-field font-family"
      dir="ltr"
      defaultValue={fontFamily}
    >
      {options.map((opt, i) => (
        <option
          key={i}
          value={opt.value}
          className="p-2 bg-[#1E1F29] text-slate-200 text-sm hover:bg-[#7c3aed]"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SelectField);
