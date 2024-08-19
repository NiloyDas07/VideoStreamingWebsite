import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <label className="relative">
      <span className="sr-only">{props.label}</span>
      <input
        {...props}
        ref={ref}
        className={`${props.type === "file" ? "" : "input-validation"} dark:border-neutral-4 dark:ring-neutral-4 w-full rounded-md border px-4 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:bg-primary sm:text-sm ${props.className}`}
      />
      {props.requiredStars && props.required && (
        <span className="absolute -right-3 -top-1.5 text-red-700">*</span>
      )}
    </label>
  );
});

export default Input;
