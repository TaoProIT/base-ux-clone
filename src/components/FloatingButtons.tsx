import { Phone, MessageCircle } from "lucide-react";

export const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
      <a
        href="tel:0933549469"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0f426c] flex items-center justify-center text-white hover:bg-[#3087fe] transition-all duration-300 shadow-lg hover:shadow-xl group animate-shake touch-manipulation"
        aria-label="Gọi điện"
        style={{ minWidth: '48px', minHeight: '48px' }}
      >
        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
      <a
        href="https://zalo.me/763475936290889196"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0f426c] flex items-center justify-center text-white hover:bg-[#3087fe] transition-all duration-300 shadow-lg hover:shadow-xl group animate-shake touch-manipulation"
        aria-label="Zalo"
        style={{ minWidth: '48px', minHeight: '48px' }}
      >
        <span className="text-xs sm:text-sm font-semibold group-hover:scale-110 transition-transform">Zalo</span>
      </a>
    </div>
  );
};
