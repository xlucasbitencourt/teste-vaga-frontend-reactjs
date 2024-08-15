type Props = {
  children: React.ReactNode;
  className?: string;
};

export function H1({ children, className = "" }: Props) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}
