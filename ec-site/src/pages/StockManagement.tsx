// 在庫管理ページ: 全商品の在庫数を一覧表示し、増減できる
import { type Product } from '../types/product.ts';

// Propsの型定義
type StockManagementProps = {
    products: Product[];
    stocks: Record<number, number>;
    onUpdateStock: (productId: number, delta: number) => void;
};

function StockManagement({ products, stocks, onUpdateStock }: StockManagementProps) {
    return (
        <main className="main">
            <section className="stock-management">
                <h2 className="stock-management__heading">在庫管理</h2>

                {/* 在庫一覧テーブル */}
                <div className="stock-management__table">
                    {/* テーブルヘッダー */}
                    <div className="stock-management__row stock-management__row--header">
                        <span className="stock-management__cell">商品名</span>
                        <span className="stock-management__cell">価格</span>
                        <span className="stock-management__cell">在庫数</span>
                        <span className="stock-management__cell">操作</span>
                    </div>

                    {/* 商品ごとの在庫行 */}
                    {products.map((product) => {
                        // 現在の在庫数を取得する
                        const currentStock = stocks[product.id] ?? 0;
                        const isSoldOut = currentStock === 0;

                        return (
                            <div key={product.id} className="stock-management__row">
                                {/* 商品名 */}
                                <span className="stock-management__cell stock-management__cell--name">
                                    {product.name}
                                </span>

                                {/* 価格 */}
                                <span className="stock-management__cell">
                                    ¥{product.price.toLocaleString()}
                                </span>

                                {/* 在庫数（0のときは赤色で表示） */}
                                <span className={`stock-management__cell stock-management__stock${isSoldOut ? ' stock-management__stock--zero' : ''}`}>
                                    {currentStock}
                                </span>

                                {/* + / - ボタン */}
                                <div className="stock-management__cell stock-management__controls">
                                    {/* 減らすボタン（在庫が0のときは非活性） */}
                                    <button
                                        className="stock-management__btn stock-management__btn--minus"
                                        type="button"
                                        onClick={() => onUpdateStock(product.id, -1)}
                                        disabled={isSoldOut}
                                        aria-label={`${product.name}の在庫を1減らす`}
                                    >
                                        −
                                    </button>

                                    {/* 増やすボタン */}
                                    <button
                                        className="stock-management__btn stock-management__btn--plus"
                                        type="button"
                                        onClick={() => onUpdateStock(product.id, 1)}
                                        aria-label={`${product.name}の在庫を1増やす`}
                                    >
                                        ＋
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default StockManagement;
