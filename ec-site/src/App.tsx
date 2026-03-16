// メインコンポーネント: ルーティング・カート状態・在庫状態・モーダル状態を管理する
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import ProductCard from './components/ProductCard.tsx';
import CartModal from './components/CartModal.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import StockManagement from './pages/StockManagement.tsx';
import { type Product, type CartItem } from './types/product.ts';
import productsData from './data/products.json';

// JSONから読み込んだ商品データをProduct型として扱う
const PRODUCTS: Product[] = productsData;

function App() {
    // カートアイテムをuseStateで管理する（商品 + 個数の配列）
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // カートモーダルの表示状態を管理する
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    // 在庫数をuseStateで管理する（商品ID → 在庫数のマップ）
    const [stocks, setStocks] = useState<Record<number, number>>(
        () => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]))
    );

    // カート合計個数を算出する
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // カートに商品を追加する関数（既存商品は個数を加算する）
    const handleAddToCart = (product: Product): void => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                // 既にカートにある場合は個数を1増やす
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // 新規の場合はカートに追加する
            return [...prev, { product, quantity: 1 }];
        });
    };

    // 在庫数を増減する関数（0以下にはならない）
    const handleUpdateStock = (productId: number, delta: number): void => {
        setStocks((prev) => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] ?? 0) + delta),
        }));
    };

    // 注文確定時の処理: 在庫をカート個数分マイナス・カートをクリア・モーダルを閉じる
    const handleOrder = (orderedItems: CartItem[]): void => {
        // 注文した商品の個数分だけ在庫を減らす
        setStocks((prev) => {
            const updated = { ...prev };
            orderedItems.forEach((item) => {
                updated[item.product.id] = Math.max(
                    0,
                    (updated[item.product.id] ?? 0) - item.quantity
                );
            });
            return updated;
        });

        // カートを空にする
        setCartItems([]);

        // モーダルを閉じる
        setIsCartOpen(false);

        // 注文完了メッセージを表示する
        alert('ご注文ありがとうございました！');
    };

    return (
        <>
            {/* ヘッダー: カート個数・モーダル開閉ハンドラを渡す */}
            <Header
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />

            {/* ルーティング設定 */}
            <Routes>
                {/* 商品一覧ページ */}
                <Route
                    path="/"
                    element={
                        <main className="main">
                            <section className="product-list">
                                <h2 className="product-list__heading">商品一覧</h2>
                                <div className="product-list__grid">
                                    {PRODUCTS.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            stock={stocks[product.id] ?? 0}
                                            cartCount={cartItems.find((item) => item.product.id === product.id)?.quantity ?? 0}
                                            onAddToCart={handleAddToCart}
                                        />
                                    ))}
                                </div>
                            </section>
                        </main>
                    }
                />

                {/* 商品詳細ページ */}
                <Route
                    path="/product/:id"
                    element={<ProductDetail onAddToCart={handleAddToCart} stocks={stocks} />}
                />

                {/* 在庫管理ページ */}
                <Route
                    path="/stock"
                    element={
                        <StockManagement
                            products={PRODUCTS}
                            stocks={stocks}
                            onUpdateStock={handleUpdateStock}
                        />
                    }
                />
            </Routes>

            {/* フッター */}
            <footer className="footer">
                <p>&copy; 2026 ECサイト All Rights Reserved.</p>
            </footer>

            {/* カートモーダル（isCartOpenがtrueのときのみ表示） */}
            {isCartOpen && (
                <CartModal
                    cartItems={cartItems}
                    onClose={() => setIsCartOpen(false)}
                    onOrder={handleOrder}
                />
            )}
        </>
    );
}

export default App;
