export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav>
            <div>This is the layout that will be used by Dashboard and all its children. </div>
        </nav>
        {children}
      </section>
    )
  }