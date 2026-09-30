import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
  publicKey,
}: {
  children: React.ReactNode;
  publicKey: string;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-white">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Sidebar publicKey={publicKey} />

      {/* offset for desktop sidebar, add bottom padding for mobile nav */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 md:ml-64 min-h-screen pb-20 md:pb-0 overflow-x-hidden focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
}

