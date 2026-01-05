"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PlanOption } from "@/lib/cartCodes";

const CART_COOKIE_NAME = "sof_cart";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface CartItem {
  slug: string;
  name: string;
  plan: PlanOption;
  productCode: string;
  quantity: number;
  addedAt: number;
}

interface CartItemInput {
  slug: string;
  name: string;
  plan: PlanOption;
  productCode: string;
  quantity?: number;
}

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  isReady: boolean;
  addItem: (item: CartItemInput) => boolean;
  removeItem: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";")[0] || null;
  return null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          slug: String(item.slug || "unknown"),
          name: String(item.name || "Sản phẩm"),
          plan: (item.plan === "basic" || item.plan === "pro" || item.plan === "full") ? item.plan : "basic",
          productCode: String(item.productCode || item.slug || ""),
          quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
          addedAt: Number(item.addedAt) || Date.now(),
        }))
        .filter(Boolean);
    }
  } catch (error) {
    console.warn("Không đọc được cookie giỏ hàng", error);
  }
  return [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Hydrate cart from cookie on first mount
  useEffect(() => {
    const savedCart = parseCart(readCookie(CART_COOKIE_NAME));
    setCart(savedCart);
    setIsReady(true);
  }, []);

  // Persist cart when ready
  useEffect(() => {
    if (!isReady) return;
    const serialized = encodeURIComponent(JSON.stringify(cart));
    writeCookie(CART_COOKIE_NAME, serialized, CART_COOKIE_MAX_AGE);
  }, [cart, isReady]);

  // Re-sync cart when returning to tab
  useEffect(() => {
    if (!isReady) return;
    const syncCart = () => {
      const savedCart = parseCart(readCookie(CART_COOKIE_NAME));
      setCart((prev) => {
        const prevSignature = JSON.stringify(prev);
        const nextSignature = JSON.stringify(savedCart);
        return prevSignature === nextSignature ? prev : savedCart;
      });
    };
    document.addEventListener("visibilitychange", syncCart);
    window.addEventListener("focus", syncCart);
    return () => {
      document.removeEventListener("visibilitychange", syncCart);
      window.removeEventListener("focus", syncCart);
    };
  }, [isReady]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const upsertItem = useCallback((item: CartItemInput) => {
    if (!item.plan || !item.productCode) return;
    setCart((prev) => {
      const existing = prev.find((p) => p.slug === item.slug && p.plan === item.plan);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug && p.plan === item.plan
            ? { ...p, quantity: p.quantity + (item.quantity || 1), addedAt: Date.now() }
            : p
        );
      }
      return [
        ...prev,
        {
          slug: item.slug,
          name: item.name,
          plan: item.plan,
          productCode: item.productCode,
          quantity: item.quantity || 1,
          addedAt: Date.now(),
        },
      ];
    });
  }, []);

  const addItem = useCallback(
    (item: CartItemInput) => {
      if (!item.plan || !item.productCode) {
        console.warn("Thiếu gói hoặc mã sản phẩm khi thêm giỏ hàng", item);
        return false;
      }
      upsertItem(item);
      return true;
    },
    [upsertItem]
  );

  const removeItem = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    deleteCookie(CART_COOKIE_NAME);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      isReady,
      addItem,
      removeItem,
      clearCart,
    }),
    [cart, cartCount, isReady, addItem, removeItem, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
