// カートモーダルコンポーネント: カート内容・合計金額・閉じるボタンを表示する
import { type CartItem } from '../types/product.ts';

// Propsの型定義
type CartModalProps = {
    cartItems: CartItem[];
    onClose: () => void;
    onOrder: (cartItems: CartItem[]) => void;
};

function CartModal({ cartItems, onClose, onOrder }: CartModalProps) {
    // 合計金額を算出する
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    // オーバーレイクリック時にモーダルを閉じる
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        // モーダル本体のクリックは無視する
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 注文するボタンを押したときの処理
    const handleOrder = (): void => {
        // 確認ダイアログを表示する
        const confirmed = window.confirm('注文を確定しますか？');
        if (!confirmed) return;

        // 注文確定: 在庫更新・カートクリア・モーダルクローズを親に委譲する
        onOrder(cartItems);
    };

    return (
        // モーダルオーバーレイ
        <div className="cart-modal" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="カート">
            {/* モーダル本体 */}
            <div className="cart-modal__inner">
                {/* モーダルヘッダー */}
                <div className="cart-modal__header">
                    <h2 className="cart-modal__title">カートの中身</h2>
                    {/* 閉じるボタン */}
                    <button className="cart-modal__close" type="button" onClick={onClose} aria-label="モーダルを閉じる">
                        ✕
                    </button>
                </div>

                {/* カートの内容 */}
                <div className="cart-modal__body">
                    {cartItems.length === 0 ? (
                        // カートが空のときのメッセージ
                        <p className="cart-modal__empty">カートに商品がありません</p>
                    ) : (
                        // カートアイテム一覧
                        <ul className="cart-modal__list">
                            {cartItems.map((item) => (
                                <li key={item.product.id} className="cart-modal__item">
                                    {/* 商品画像 */}
                                    <img
                                        className="cart-modal__item-image"
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />
                                    {/* 商品情報 */}
                                    <div className="cart-modal__item-info">
                                        <p className="cart-modal__item-name">{item.product.name}</p>
                                        <p className="cart-modal__item-price">
                                            ¥{item.product.price.toLocaleString()}
                                            <span className="cart-modal__item-price-note">（税込）</span>
                                        </p>
                                    </div>
                                    {/* 個数 */}
                                    <p className="cart-modal__item-qty">× {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 合計金額・注文ボタンエリア */}
                {cartItems.length > 0 && (
                    <div className="cart-modal__footer">
                        <p className="cart-modal__total">
                            合計
                            <span className="cart-modal__total-price">
                                ¥{totalPrice.toLocaleString()}
                            </span>
                            <span className="cart-modal__total-note">（税込）</span>
                        </p>
                        {/* 注文するボタン */}
                        <button
                            className="cart-modal__order-button"
                            type="button"
                            onClick={handleOrder}
                        >
                            注文する
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartModal;
