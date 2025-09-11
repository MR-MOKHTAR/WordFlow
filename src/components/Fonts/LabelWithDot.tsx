import { memo } from "react";

type Props = {
  htmlFor: string;
  children: React.ReactNode;
};

function LabelWithDot({ htmlFor, children }: Props) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-x-2">
      <span className="inline-block size-3 bg-slate-300 rounded-full"></span>
      <span className="font-bold text-lg text-gray-700 dark:text-gray-200">
        {children}
      </span>
    </label>
  );
}

export default memo(LabelWithDot);
