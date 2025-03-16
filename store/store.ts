import { Product } from "@/sanity.types";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BasketItem {
    product: Product;
    quantity: number;
}

interface BasketState {
    items: BasketItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existingItem = state.items.find(item => item.product._id === product._id);
                if (existingItem) {
                    
                    return {
                        items: state.items.map(item =>
                            item.product._id === product._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                } else {
                    //  new item, add it to the basket
                    return {
                        items: [...state.items, { product, quantity: 1 }]
                    };
                }
            }),
            removeItem: (productId) => set((state) => ({
                items: state.items.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }
                        // iif the quantity is 1 remove the item entirely
                    } else {
                        acc.push(item);
                    }
                    return acc;
                }, [] as BasketItem[]) 
            })),
            clearBasket: () => set ({ items: [] }),
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
            },
            getItemCount: (productId) => {
                const state = get();
                const item = state.items.find(item => item.product._id === productId);
                return item ? item.quantity : 0;
            },
            getGroupedItems: () => get().items,
            }),
    
        {
            name: "basket-store", //  name of the persisted state key
        }
    )
);

export default useBasketStore;
