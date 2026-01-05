"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  CreditCard,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildProductCode, getPlanOptions, PlanOption, planLabel } from "@/lib/cartCodes";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

interface ProductSubNavProps {
  productSlug: string;
  productName?: string;
}

export default function ProductSubNav({ productSlug, productName }: ProductSubNavProps) {
  const pathname = usePathname();
  const basePath = `/${productSlug}`;
  const { addItem } = useCart();
  const planOptions = getPlanOptions();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>("basic");
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  const confirmAdd = () => {
    const productCode = buildProductCode(productSlug, selectedPlan);
    if (!productCode) {
      setError("Chưa cấu hình mã sản phẩm cho gói này. Liên hệ kỹ thuật.");
      return;
    }
    const success = addItem({
      slug: productSlug,
      name: productName || productSlug,
      plan: selectedPlan,
      productCode,
    });
    if (success) {
      setIsDialogOpen(false);
      setError(null);
    }
  };

  const navItems: NavItem[] = [
    {
      label: "Tổng quan",
      href: basePath,
      icon: <Home className="w-4 h-4" />,
      exact: true,
    },
    {
      label: "Tính năng",
      href: `${basePath}/features`,
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      label: "Bảng giá",
      href: productSlug === 'phan-mem-ban-hang' && pathname === basePath ? "#pricing" : `${basePath}/pricing`,
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      label: "Tài liệu",
      href: `${basePath}/user-guide`,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Thêm vào giỏ hàng",
      href: "#add-to-cart",
      icon: <ShoppingCart className="w-4 h-4" />,
      onClick: handleAddToCart,
    }
  ];

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <nav
      className="fixed top-16 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      aria-label={`Điều hướng ${productName || 'sản phẩm'}`}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1 py-1" role="menubar">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href + item.label} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${active
                      ? "bg-[var(--sof-primary)] text-white shadow-md"
                      : "text-gray-600 hover:text-[var(--sof-primary)] hover:bg-gray-100"
                    }
                  `}
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation - Scrollable */}
        <div className="md:hidden overflow-x-auto scrollbar-hide py-2">
          <ul className="flex items-center gap-2 min-w-max" role="menubar">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href + item.label} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium
                      whitespace-nowrap transition-all duration-200
                      ${active
                        ? "bg-[var(--sof-primary)] text-white shadow-md"
                        : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                      }
                    `}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn gói trước khi thêm</DialogTitle>
            <DialogDescription>
              Cần chọn đúng gói (Basic/Pro/Full) để khớp mã sản phẩm trong ERP.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as PlanOption)}>
            {planOptions.map((option) => {
              const codePreview = buildProductCode(productSlug, option.value);
              return (
                <div key={option.value} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                  <RadioGroupItem value={option.value} id={`plan-${option.value}`} />
                  <Label htmlFor={`plan-${option.value}`} className="cursor-pointer space-y-1">
                    <div className="font-semibold text-slate-900">{option.label}</div>
                    <div className="text-xs text-slate-500">Mã ERP: {codePreview || "Chưa cấu hình"}</div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Huỷ</Button>
            <Button onClick={confirmAdd}>Thêm vào giỏ ({planLabel(selectedPlan)})</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
