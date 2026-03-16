// ===== カート機能 =====

// カート合計個数を管理する変数
var cartCount = 0;

// バッジ要素を取得する
var cartBadge = document.getElementById('js-cart-badge');

// ヘッダーのカート合計個数表示を更新する関数
function updateCartBadge() {
    // バッジのテキストを最新の個数に更新する
    cartBadge.textContent = cartCount;

    // 1個以上のときバッジを表示、0のときは非表示にする
    if (cartCount > 0) {
        cartBadge.classList.add('header__cart-badge--visible');
    } else {
        cartBadge.classList.remove('header__cart-badge--visible');
    }

    // バウンスアニメーションを一度リセットしてから再適用する
    cartBadge.classList.remove('header__cart-badge--bounce');
    // requestAnimationFrame で1フレーム後に付与してアニメーションを確実に発火させる
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            cartBadge.classList.add('header__cart-badge--bounce');
        });
    });
}

// 全カートボタンを取得してクリックイベントを登録する
var cartButtons = document.querySelectorAll('.product-card__button');

cartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // クリックされたカードの商品名を取得する
        var card = button.closest('.product-card');
        var productName = card.querySelector('.product-card__name').textContent;

        // カート個数を1増やしてバッジを更新する
        cartCount++;
        updateCartBadge();

        // ボタンのテキストを一時的に「追加しました！」に変えてフィードバックを伝える
        var originalText = button.textContent;
        button.textContent = '追加しました！';
        button.disabled = true;

        // 1.2秒後に元のテキストに戻す
        setTimeout(function() {
            button.textContent = originalText;
            button.disabled = false;
        }, 1200);
    });
});
