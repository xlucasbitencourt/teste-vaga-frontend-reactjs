type Props = {
  children: React.ReactNode;
  className?: string;
};

export function P({ children, className = "" }: Props) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-2 ${className}`}
    >
      {children}
    </p>
  );
}
