import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg bg-surface-container-highest dark:bg-surface-container-high border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-max-width mx-auto px-container-padding gap-gutter">
        <Link href="/" className="font-display text-headline-md text-on-surface hover:text-primary transition-colors">
          TaskFlow
        </Link>
        <div className="flex gap-stack-md flex-wrap justify-center">
          <Link href="#" className="font-sans text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="font-sans text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="font-sans text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Security
          </Link>
          <Link href="#" className="font-sans text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Status
          </Link>
        </div>
        <div className="font-sans text-label-sm text-on-surface-variant">
          © 2024 TaskFlow Productivity Suite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
