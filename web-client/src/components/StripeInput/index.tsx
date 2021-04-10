import React, { useRef, useImperativeHandle } from "react";

const StripeInput = ({ component: Component, inputRef, ...other }: any) => {
  const elementRef = useRef<any>();
  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element: any) => (elementRef.current = element)}
      {...other}
    />
  );
};

export default StripeInput;
