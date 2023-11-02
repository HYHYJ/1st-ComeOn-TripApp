import PropTypes from 'prop-types';

function Button({ children, type, className, onClick, ...restProps }) {
  return (
    <button type={type} className={className} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
