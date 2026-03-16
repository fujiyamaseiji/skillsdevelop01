// 共通型定義: 商品・カートアイテム

// 商品データの型
export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    stock: number;
};

// カートアイテムの型（商品 + 個数）
export type CartItem = {
    product: Product;
    quantity: number;
};
