"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { planLabel } from "@/lib/cartCodes";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, cartCount, isReady, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const isEmpty = cart.length === 0;

  if (!mounted || !isReady) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28 min-h-screen">
        <p className="text-sm text-muted-foreground">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  const submitCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để gửi yêu cầu.");
      return;
    }
    if (!apiUrl) {
      alert("Thiếu cấu hình API (NEXT_PUBLIC_API_URL).");
      return;
    }
    if (isEmpty) {
      alert("Giỏ hàng đang trống.");
      return;
    }

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const customerBase = `CUS${Date.now()}`;
    const basePayload = {
      table: "sl_lv0013",
      func: "insert",
      tenKH: user.name || user.username,
      email: user.email || "",
      sdt: "",
      nguoiDaiDien: user.username,
      ngayLam: today.toISOString().split("T")[0],
      ngayKetThuc: nextMonth.toISOString().split("T")[0],
    };

    setIsSubmitting(true);
    try {
      const results = await Promise.allSettled(
        cart.map(async (item, index) => {
          const ghiChu = `Yêu cầu gói ${planLabel(item.plan)} cho ${item.name} (${item.slug}) x${item.quantity}`;
          const payload = {
            ...basePayload,
            maKH: `${customerBase}-${index + 1}`,
            itemId: item.productCode,
            ghiChu,
          };

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(apiToken ? { "SOF-User-Token": apiToken } : {}),
            },
            body: JSON.stringify(payload),
          });

          const text = await res.text();
          let data: any = null;
          try {
            data = JSON.parse(text);
          } catch (err) {
            console.warn("Response is not JSON", err, text);
          }

          if (!res.ok || data?.success === false) {
            const message = data?.message || `API error ${res.status}`;
            throw new Error(message);
          }

          return { ok: true, data };
        })
      );

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        throw new Error(`Có ${failed.length} sản phẩm chưa gửi được. Vui lòng thử lại.`);
      }

      alert("Đã gửi yêu cầu từ giỏ hàng. Chúng tôi sẽ liên hệ sớm.");
      clearCart();
      window.location.reload();
    } catch (error) {
      console.error("Submit cart failed", error);
      alert("Gửi yêu cầu thất bại, vui lòng thử lại hoặc liên hệ hotline 0933549469.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Lưu trữ trong cookie của trình duyệt</p>
          <h1 className="text-3xl font-bold text-[#0f426c] flex items-center gap-2">
            <ShoppingCart className="w-7 h-7" /> Giỏ hàng
          </h1>
        </div>
        <Link href="/" className="text-sm text-[#3087fe] hover:underline">Tiếp tục xem sản phẩm</Link>
      </div>

      {isEmpty && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <p className="text-lg font-semibold text-slate-800 mb-2">Giỏ hàng của bạn đang trống</p>
          <p className="text-sm text-slate-600 mb-4">Chọn một sản phẩm để chúng tôi lưu vào cookie của bạn.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/">
              <Button variant="hero">Xem sản phẩm</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Nhận tư vấn</Button>
            </Link>
          </div>
        </div>
      )}

      {!isEmpty && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Có {cartCount} mục trong giỏ hàng.</p>
            <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={clearCart}>
              Xóa toàn bộ
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <li key={item.slug} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">Gói: {planLabel(item.plan)}</p>
                    <p className="text-xs text-slate-500">Mã ERP: {item.productCode}</p>
                    <p className="text-xs text-slate-500">Slug: {item.slug}</p>
                    <p className="text-xs text-slate-500">Số lượng: {item.quantity}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => removeItem(item.slug)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-slate-600">Thông tin giỏ hàng chỉ dùng để liên hệ tư vấn nhanh.</p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <Button
                variant="hero"
                className="w-full sm:w-auto"
                onClick={submitCart}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu lên đơn"}
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">Chọn thêm sản phẩm</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
