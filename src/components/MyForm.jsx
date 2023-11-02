import React from 'react';

// eslint-disable-next-line react/display-name
const MyForm = React.forwardRef(({ children, onSubmit, className }, ref) => {
  return (
    <form onSubmit={onSubmit} className={className} ref={ref}>
      {children}
    </form>
  );
});

export default MyForm;
