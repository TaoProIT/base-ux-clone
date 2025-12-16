import type { Metadata } from "next";
import Link from "next/link";

// SEO Metadata for 404 page
export const metadata: Metadata = {
  title: "404 - Không Tìm Thấy Trang",
  description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
  robots: {
    index: false,
    follow: false,
  },
};

// Server Component - This is the default 404 page in Next.js App Router
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f4fbff] to-white">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-[#0f426c] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! Không tìm thấy trang
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng
          kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#3087fe] text-white font-semibold rounded-lg hover:bg-[#0f426c] transition-colors"
        >
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}
