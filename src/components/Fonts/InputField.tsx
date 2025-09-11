import { memo } from "react";

type PropsType = {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ id, placeholder, value, onChange }: PropsType) {
  return (
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="fs-field font-size"
    />
  );
}

export default memo(InputField);
