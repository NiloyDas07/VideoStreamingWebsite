import React, { forwardRef } from "react";

const Textarea = forwardRef((props, ref) => {
  const { requiredStars = true, ...rest } = props;

  return (
    <label className="relative">
      <span className="sr-only">{props.label}</span>
      <textarea
        {...rest}
        ref={ref}
        className={`input-validation w-full rounded-md border px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:border-neutral-4 dark:bg-primary dark:ring-neutral-4 sm:text-sm ${props.className}`}
      ></textarea>
      {requiredStars && props.required && (
        <span className="absolute -right-3 -top-1.5 text-red-700">*</span>
      )}
    </label>
  );
});

export default Textarea;
