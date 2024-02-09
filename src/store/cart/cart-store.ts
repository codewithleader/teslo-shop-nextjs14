import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';

interface State {
  cart: CartProduct[];

  // methods
  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity:
  // removeProduct:
}

export const useCartStore = create<State>()(
  //
  (set, get) => ({
    cart: [],

    // Methods
    addProductToCart: (product: CartProduct) => {
      const { cart } = get();
      // 1. Revisar si el producto existe en el carrito con la talla seleccionada
      const isProductInCart: boolean = cart.some(
        (item) => item.id === product.id && item.size === product.size,
      );
      if (!isProductInCart) {
        set({ cart: [...cart, product] });
        return;
      }
      // 2. Sé que el producto existe por talla, tengo que incrementarlo
      const updatedCartProducts = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: item.quantity + product.quantity };
        }
        return item;
      });
      set({ cart: updatedCartProducts });
    },
  }),
);
