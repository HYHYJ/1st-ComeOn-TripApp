import React from 'react';

// eslint-disable-next-line react/display-name
const MyInput = React.forwardRef(
  ({ label, type, id, placeholder, className, labelClass, children, ...restProps }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          className={className}
          {...restProps}
        />
        {children}
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </>
    );
  },
);

export default MyInput;
