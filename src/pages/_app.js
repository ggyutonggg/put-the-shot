// src/pages/_app.js
import '@/components/game/GameContext'; // 確保載入 context
import { GameProvider } from '@/components/game/GameContext';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
