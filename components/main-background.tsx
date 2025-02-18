export default function Background({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      id="background-main"
      className="relative w-full h-full bg-cover bg-center bg-fixed"
    >
      {children}
    </div>
  );
}
