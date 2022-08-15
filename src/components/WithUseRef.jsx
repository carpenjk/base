import { useRef, forwardRef } from 'react';

const withUseRef = (Component) => {
  function WithUseRef(props) {
    const innerRef = useRef(null);
    const { forwardedRef, ...rest } = props;

    return <Component ref={forwardedRef} innerRef={innerRef} {...rest} />;
  }
  WithUseRef.displayName = `withUseRef(${Component.displayName})`;

  return forwardRef((props, ref) => (
    <WithUseRef forwardedRef={ref} {...props} />
  ));
};

export default withUseRef;
