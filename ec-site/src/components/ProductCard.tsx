// 商品カードコンポーネント: 画像・商品名・価格・カートボタンを表示する
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../types/product.ts';

// Propsの型定義
type ProductCardProps = {
    product: Product;
    stock: number;
    cartCount: number;
    onAddToCart: (product: Product) => void;
};

function ProductCard({ product, stock, cartCount, onAddToCart }: ProductCardProps) {
    // ボタンの「追加しました」状態を管理する（boolean型）
    const [added, setAdded] = useState<boolean>(false);

    // 詳細ページへの遷移に使用するフック
    const navigate = useNavigate();

    // 在庫切れかどうかを判定する（在庫数が0）
    const isSoldOut = stock === 0;

    // カート内個数が在庫数に達しているかを判定する
    const isAtStockLimit = !isSoldOut && cartCount >= stock;

    // カードクリック時に詳細ページへ遷移する
    const handleCardClick = (): void => {
        navigate(`/product/${product.id}`);
    };

    // カートに追加するボタンを押したときの処理
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        // カードクリックイベントへの伝播を止める
        e.stopPropagation();
        onAddToCart(product);
        setAdded(true);

        // 1.2秒後にボタンテキストを元に戻す
        setTimeout(() => {
            setAdded(false);
        }, 1200);
    };

    return (
        // カード全体クリックで詳細ページへ遷移する
        <article className="product-card" onClick={handleCardClick}>
            {/* 商品画像 */}
            <div className="product-card__image-wrap">
                <img
                    className="product-card__image"
                    src={product.image}
                    alt={product.name}
                />
            </div>

            {/* 商品情報エリア */}
            <div className="product-card__body">
                {/* 商品名 */}
                <p className="product-card__name">{product.name}</p>

                {/* 価格（在庫切れのときは打ち消し線を付ける） */}
                <p className={`product-card__price${isSoldOut ? ' product-card__price--sold-out' : ''}`}>
                    ¥{product.price.toLocaleString()}
                    <span className="product-card__price-note">（税込）</span>
                </p>

                {/* カートに入れるボタン（在庫切れ・在庫上限のときは非活性） */}
                <button
                    className={[
                        'product-card__button',
                        isSoldOut || isAtStockLimit ? 'product-card__button--sold-out' : '',
                    ].join(' ').trim()}
                    type="button"
                    onClick={handleButtonClick}
                    disabled={added || isSoldOut || isAtStockLimit}
                >
                    {isSoldOut ? 'SOLD OUT' : isAtStockLimit ? '在庫上限' : added ? '追加しました！' : 'カートに入れる'}
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
