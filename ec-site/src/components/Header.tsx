// ヘッダーコンポーネント: ナビゲーション・カートアイコン・合計個数バッジを表示する
import { NavLink } from 'react-router-dom';

// Propsの型定義
type HeaderProps = {
    cartCount: number;
    onCartClick: () => void;
};

function Header({ cartCount, onCartClick }: HeaderProps) {
    // 個数が1以上のときバッジを表示するクラスを付与する
    const badgeClass = [
        'header__cart-badge',
        cartCount > 0 ? 'header__cart-badge--visible' : '',
    ].join(' ').trim();

    return (
        <header className="header">
            <h1 className="header__title">ECサイト</h1>

            {/* ナビゲーション: 商品一覧・在庫管理へのリンク */}
            <nav className="header__nav">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
                    }
                    end
                >
                    商品一覧
                </NavLink>
                <NavLink
                    to="/stock"
                    className={({ isActive }) =>
                        isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
                    }
                >
                    在庫管理
                </NavLink>
            </nav>

            {/* カートアイコン: クリックでモーダルを開く */}
            <div className="header__cart" onClick={onCartClick} role="button" aria-label="カートを開く">
                {/* カートアイコン（SVG） */}
                <svg
                    className="header__cart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>

                {/* 合計個数バッジ */}
                <span className={badgeClass}>{cartCount}</span>
            </div>
        </header>
    );
}

export default Header;
