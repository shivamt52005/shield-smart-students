import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/learn", label: "Learn" },
  { to: "/simulator", label: "Simulator" },
  { to: "/quiz", label: "Quiz" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/report", label: "Report" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>Cyber Awareness Portal</span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            className="rounded-md border p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t px-4 py-2 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          <p>Cybersecurity Awareness Portal for College Students — educational project.</p>
          <p className="mt-1">
            All examples are fictional. Never share your password or OTP with anyone, including this site.
          </p>
        </div>
      </footer>
    </div>
  );
}
