import React, { forwardRef } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <div ref={ref} className={className} {...rest}>
        <div className="max-w-[1440px] mx-auto">{children}</div>
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
