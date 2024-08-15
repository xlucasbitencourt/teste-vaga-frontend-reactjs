type Props = {
  children: React.ReactNode;
  className?: string;
};

export function H3({ children, className = "" }: Props) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}
