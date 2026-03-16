// エントリーポイント: BrowserRouterでアプリ全体をラップしてマウントする
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import App from './App.tsx';

// root要素が存在しない場合はエラーを投げる
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('root要素が見つかりません');
}

createRoot(rootElement).render(
    <StrictMode>
        {/* BrowserRouterでReact Routerを有効化する */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
