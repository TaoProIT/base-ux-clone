# Hướng Dẫn Chuyển Đổi Dự Án Vite + React sang Next.js 14+ (App Router)

## 📋 Tổng Quan

Tài liệu này hướng dẫn cách chuyển đổi dự án SOF.VN Landing Page từ Vite + React sang Next.js 14+ với App Router để tối ưu hóa SEO.

## 🚀 Các Bước Thực Hiện

### Bước 1: Cập Nhật Dependencies

Thay thế `package.json` hiện tại bằng nội dung từ `package.nextjs.json`:

```bash
# Backup package.json cũ
mv package.json package.vite.json.backup

# Rename file mới
mv package.nextjs.json package.json

# Cài đặt dependencies
npm install
# hoặc
bun install
```

### Bước 2: Cập Nhật TypeScript Config

Thay thế `tsconfig.json` bằng `tsconfig.nextjs.json`:

```bash
mv tsconfig.json tsconfig.vite.json.backup
mv tsconfig.nextjs.json tsconfig.json
```

### Bước 3: Cập Nhật Cấu Trúc Thư Mục

#### Cấu trúc mới (App Router):
```
src/
├── app/
│   ├── layout.tsx          # Root layout với metadata
│   ├── page.tsx             # Homepage (/)
│   ├── globals.css          # Global styles
│   ├── not-found.tsx        # 404 page
│   ├── contact/
│   │   ├── page.tsx         # /contact (Server Component)
│   │   └── ContactPageClient.tsx  # Client Component với form
│   ├── user-guide/
│   │   └── page.tsx         # /user-guide
│   ├── warranty-policy/
│   │   └── page.tsx         # /warranty-policy
│   ├── payment-terms/
│   │   └── page.tsx         # /payment-terms
│   ├── customers/
│   │   └── page.tsx         # /customers
│   └── under-construction/
│       └── page.tsx         # /under-construction
├── components/
│   ├── providers/
│   │   ├── AOSProvider.tsx   # AOS initialization (Client)
│   │   └── QueryProvider.tsx # React Query provider (Client)
│   ├── NavbarNextjs.tsx     # Navbar cho Next.js
│   ├── FooterNextjs.tsx     # Footer cho Next.js
│   └── ...                   # Các components khác
```

### Bước 4: Cập Nhật Components

#### 4.1 Rename Component Files:
```bash
# Trong src/components/
mv NavbarNextjs.tsx Navbar.tsx
mv FooterNextjs.tsx Footer.tsx
```

#### 4.2 Cập Nhật Imports trong Components:

Thay đổi React Router thành Next.js Navigation:

```tsx
// ❌ Trước (React Router)
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";

// ✅ Sau (Next.js)
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
```

#### 4.3 Thêm "use client" directive:

Các component sử dụng hooks như `useState`, `useEffect` cần thêm `"use client"` ở đầu file:

```tsx
"use client";

import { useState, useEffect } from "react";
// ...
```

### Bước 5: Cập Nhật Image Handling

```tsx
// ❌ Trước (Vite)
import logo from "@/assets/logo/logo.png";
<img src={logo} alt="Logo" />

// ✅ Sau (Next.js)
import Image from "next/image";
<Image src="/logo/logo.png" alt="Logo" width={40} height={40} />
```

Di chuyển assets từ `src/assets/` sang `public/`:
```bash
# Copy logo
cp -r src/assets/logo public/logo
cp -r src/assets/img public/img
```

### Bước 6: Xóa Files Không Cần Thiết

```bash
# Xóa các file Vite
rm vite.config.ts
rm index.html
rm src/main.tsx
rm src/App.tsx
rm -rf src/pages/

# Xóa tsconfig cũ
rm tsconfig.app.json
rm tsconfig.node.json
```

## 📝 SEO Metadata

### Root Layout Metadata (app/layout.tsx):

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://sof.vn"),
  title: {
    default: "SOF.VN - Giải pháp phần mềm & Chuyển đổi số toàn diện",
    template: "%s | SOF.VN",
  },
  description: "...",
  // OpenGraph, Twitter, robots, icons...
};
```

### Page-level Metadata:

```tsx
// app/contact/page.tsx
export const metadata: Metadata = {
  title: "Liên Hệ", // Sẽ hiển thị "Liên Hệ | SOF.VN"
  description: "...",
  openGraph: {
    title: "Liên Hệ | SOF.VN",
    // ...
  },
};
```

## 🔄 Server vs Client Components

### Quy tắc:

1. **Server Components (mặc định)**: Tốt cho SEO, fetch data trên server
2. **Client Components**: Cần khi dùng hooks, event handlers, browser APIs

### Ví dụ Pattern:

```tsx
// app/contact/page.tsx (Server Component - export metadata)
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {/*...*/};

export default function ContactPage() {
  return <ContactPageClient />;
}

// app/contact/ContactPageClient.tsx (Client Component - form logic)
"use client";

export function ContactPageClient() {
  const [formData, setFormData] = useState({/*...*/});
  // Form handling...
}
```

## 🧪 Chạy Dự Án

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start
```

## ⚠️ Lưu Ý Quan Trọng

1. **AOS Animation**: Đã được wrap trong `AOSProvider` với "use client"
2. **React Query**: Đã được wrap trong `QueryProvider` với "use client"
3. **External Links**: Sử dụng `<a>` thông thường, internal links dùng `<Link>`
4. **Images**: Tất cả hình ảnh trong `public/` được Next.js tối ưu
5. **Fonts**: Sử dụng `next/font` để tối ưu font loading

## 📁 Files Đã Tạo

### Config Files:
- `next.config.mjs` - Next.js configuration
- `package.nextjs.json` - Dependencies cho Next.js
- `tsconfig.nextjs.json` - TypeScript config cho Next.js

### App Router:
- `src/app/layout.tsx` - Root layout với SEO metadata
- `src/app/globals.css` - Global styles
- `src/app/page.tsx` - Homepage
- `src/app/not-found.tsx` - 404 page
- `src/app/contact/page.tsx` - Contact page
- `src/app/contact/ContactPageClient.tsx` - Contact form client component
- `src/app/user-guide/page.tsx` - User guide page
- `src/app/warranty-policy/page.tsx` - Warranty policy page
- `src/app/payment-terms/page.tsx` - Payment terms page
- `src/app/customers/page.tsx` - Customers page
- `src/app/under-construction/page.tsx` - Under construction page

### Providers:
- `src/components/providers/AOSProvider.tsx`
- `src/components/providers/QueryProvider.tsx`

### Updated Components:
- `src/components/NavbarNextjs.tsx` - Navbar cho Next.js
- `src/components/FooterNextjs.tsx` - Footer cho Next.js

## 🎯 Checklist Hoàn Thành

- [x] Tạo cấu hình Next.js (next.config.mjs)
- [x] Tạo package.json mới với Next.js dependencies
- [x] Tạo tsconfig cho Next.js
- [x] Tạo app/layout.tsx với SEO metadata
- [x] Tạo app/globals.css
- [x] Chuyển đổi tất cả pages sang App Router
- [x] Tạo AOSProvider và QueryProvider
- [x] Cập nhật Navbar cho Next.js
- [x] Cập nhật Footer cho Next.js
- [x] Tạo not-found.tsx (404 page)

## 📞 Hỗ Trợ

Nếu gặp vấn đề trong quá trình chuyển đổi, vui lòng liên hệ đội ngũ phát triển.
