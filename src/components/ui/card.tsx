import React from "react";

export const Card: React.FC<{className?: string, children?: React.ReactNode}> = ({
  className,
  children
}) => {
  return <div className={className}>{children}</div>;
};

export const CardHeader: React.FC<{className?: string, children?: React.ReactNode}> = ({
  className,
  children
}) => {
  return <div className={className}>{children}</div>;
};

export const CardTitle: React.FC<{className?: string, children?: React.ReactNode}> = ({
  className,
  children
}) => {
  return <h3 className={className}>{children}</h3>;
};

export const CardContent: React.FC<{className?: string, children?: React.ReactNode}> = ({
  className,
  children
}) => {
  return <div className={className}>{children}</div>;
};