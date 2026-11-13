import React from 'react';

export function WhatsAppPill() {
  return (
    <a
      href="https://wa.me/966539850682"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-editorial-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      aria-label="Direct WhatsApp Contact"
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        className="transition-transform group-hover:rotate-6"
        aria-hidden="true"
      >
        <path d="M16 3.5A12.5 12.5 0 0 0 5.2 22.3L3.5 28.5l6.4-1.7A12.5 12.5 0 1 0 16 3.5Z" />
        <path
          fill="#25D366"
          d="M12 10.5c-.4 0-.9.3-1.2.9-.7 1.4-.1 3.3 1.4 5.2 1.8 2.2 4 3.5 6 3.7.9.1 1.9-.5 2.2-1.4.1-.4.1-.8-.1-.9l-2.2-1.1c-.3-.1-.6 0-.8.3l-.7.9c-.1.2-.4.2-.6.1-1.3-.6-2.4-1.7-3-3-.1-.2-.1-.4.1-.6l.6-.7c.2-.3.2-.6.1-.8l-1-2.2c-.1-.3-.4-.4-.6-.4Z"
        />
      </svg>
    </a>
  );
}
