export default function Background({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full">
      <div
        id="background-main"
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center z-[-1]"
      />
      {children}
    </div>
  );
}
