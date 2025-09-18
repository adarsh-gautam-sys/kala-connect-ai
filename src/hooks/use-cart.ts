import { useCallback, useMemo } from "react";
import { useSyncExternalStore } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "kc_cart";
const WISHLIST_KEY = "kc_wishlist";

// Simple pub-sub for local state changes within this tab
const emitter = new EventTarget();
function emitChange() {
  emitter.dispatchEvent(new Event("change"));
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}
function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitChange();
}

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
function writeWishlist(ids: string[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  emitChange();
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  emitter.addEventListener("change", handler);
  // Also react to cross-tab updates
  const storageHandler = (e: StorageEvent) => {
    if (e.key === CART_KEY || e.key === WISHLIST_KEY) callback();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    emitter.removeEventListener("change", handler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function useCart() {
  const getSnapshot = () => readCart();
  const getServerSnapshot = () => [] as CartItem[];
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const count = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items],
  );
  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items],
  );

  const add = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    const current = readCart();
    const idx = current.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
      current[idx].quantity += qty;
    } else {
      current.push({ ...item, quantity: qty });
    }
    writeCart(current);
  }, []);

  const remove = useCallback((id: string) => {
    const current = readCart().filter((i) => i.id !== id);
    writeCart(current);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    const current = readCart();
    const idx = current.findIndex((i) => i.id === id);
    if (idx >= 0) {
      current[idx].quantity = Math.max(1, Math.floor(qty));
      writeCart(current);
    }
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  return { items, count, total, add, remove, clear, updateQty };
}

export function useWishlist() {
  const getSnapshot = () => readWishlist();
  const getServerSnapshot = () => [] as string[];
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = readWishlist();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    writeWishlist(next);
  }, []);

  const remove = useCallback((id: string) => {
    const current = readWishlist().filter((x) => x !== id);
    writeWishlist(current);
  }, []);

  const clear = useCallback(() => writeWishlist([]), []);

  return { ids, has, toggle, remove, clear };
}
