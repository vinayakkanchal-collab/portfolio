export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-cream/[0.08] py-8 md:py-10 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-sage">
          © 2025 Vinayak Kanchal. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[13px] text-sage">
          <span>Designed with precision</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C4956A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
