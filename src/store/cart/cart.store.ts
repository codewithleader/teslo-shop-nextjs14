import type { CartProduct, SummaryInformation } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  // methods
  getTotalItems: () => number;
  // La función "getSummaryInformation" puede reemplazar a "getTotalItems" pero se deja por fines educativos
  getSummaryInformation: () => SummaryInformation;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  //
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0,
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

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

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        // Sé que el producto existe por talla, tengo que actualizar el quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        // Sé que el producto existe por talla, tengo que actualizar el quantity
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );
        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: 'shopping-cart',
    },
  ),
);
