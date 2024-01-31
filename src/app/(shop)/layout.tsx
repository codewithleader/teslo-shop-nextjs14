export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      //
      className='min-h-screen'
    >
      {children}
    </main>
  );
}
