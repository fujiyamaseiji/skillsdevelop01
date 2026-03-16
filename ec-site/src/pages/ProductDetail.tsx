// 商品詳細ページ: 商品の詳細情報を表示し、カートに追加できる
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Product } from '../types/product.ts';
import productsData from '../data/products.json';

// JSONから読み込んだ商品データをProduct型として扱う
const PRODUCTS: Product[] = productsData;

// Propsの型定義
type ProductDetailProps = {
    onAddToCart: (product: Product) => void;
    stocks: Record<number, number>;
};

function ProductDetail({ onAddToCart, stocks }: ProductDetailProps) {
    // URLパラメータから商品IDを取得する
    const { id } = useParams<{ id: string }>();

    // 一覧ページへの遷移に使用するフック
    const navigate = useNavigate();

    // ボタンの「追加しました」状態を管理する
    const [added, setAdded] = useState<boolean>(false);

    // IDに一致する商品データを検索する
    const product = PRODUCTS.find((p) => p.id === Number(id));

    // 商品が見つからない場合はエラーメッセージを表示する
    if (!product) {
        return (
            <main className="main">
                <div className="product-detail__not-found">
                    <p>商品が見つかりませんでした。</p>
                    <button
                        className="product-detail__back-button"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        一覧に戻る
                    </button>
                </div>
            </main>
        );
    }

    // 現在の在庫数を取得する
    const currentStock = stocks[product.id] ?? 0;
    const isSoldOut = currentStock === 0;

    // カートに追加するボタンを押したときの処理
    const handleAddToCart = (): void => {
        onAddToCart(product);
        setAdded(true);

        // 1.2秒後にボタンテキストを元に戻す
        setTimeout(() => {
            setAdded(false);
        }, 1200);
    };

    return (
        <main className="main">
            <div className="product-detail">
                {/* 一覧に戻るボタン */}
                <button
                    className="product-detail__back-button"
                    type="button"
                    onClick={() => navigate('/')}
                >
                    ← 一覧に戻る
                </button>

                {/* 商品詳細コンテンツ */}
                <div className="product-detail__content">
                    {/* 商品画像 */}
                    <div className="product-detail__image-wrap">
                        <img
                            className="product-detail__image"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>

                    {/* 商品情報エリア */}
                    <div className="product-detail__info">
                        {/* 商品名 */}
                        <h1 className="product-detail__name">{product.name}</h1>

                        {/* 価格（在庫切れのときは打ち消し線を付ける） */}
                        <p className={`product-detail__price${isSoldOut ? ' product-detail__price--sold-out' : ''}`}>
                            ¥{product.price.toLocaleString()}
                            <span className="product-detail__price-note">（税込）</span>
                        </p>

                        {/* 商品説明文 */}
                        <p className="product-detail__description">{product.description}</p>

                        {/* カートに入れるボタン（在庫切れのときはSOLD OUT表示・非活性） */}
                        <button
                            className={`product-detail__cart-button${isSoldOut ? ' product-detail__cart-button--sold-out' : ''}`}
                            type="button"
                            onClick={handleAddToCart}
                            disabled={added || isSoldOut}
                        >
                            {isSoldOut ? 'SOLD OUT' : added ? '追加しました！' : 'カートに入れる'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;
