import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  // Methods
  setAddress: (shippingAddress: State['shippingAddress']) => void;
}

export const useAddressStore = create<State>()(
  // persist: saves the state in localStorage
  persist(
    //
    (set, get) => ({
      shippingAddress: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
      },

      setAddress: (shippingAddress) => {
        set({ shippingAddress });
      },
    }),
    {
      name: 'address-storage',
    },
  ),
);
