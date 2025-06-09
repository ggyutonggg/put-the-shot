import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGame } from '@/components/game/GameContext';
import { useState, useEffect } from 'react';

export default function ResultScreen() {
  const router = useRouter();
  const { selectedCharacter, result } = useGame();
  const [animationState, setAnimationState] = useState('initial');

  useEffect(() => {
    // 組件掛載后觸發動畫序列
    setAnimationState('bounce');
    setTimeout(() => {
      setAnimationState('normal');
    }, 500);
  }, []);

  const handlePlayAgain = () => {
    router.push('/game/RulesPanel');
  };

  const handleQuit = () => {
    // 跳轉到外部網站
    window.open('https://classroomdaydream.vercel.app', '_blank');
  };

  // 根據勝敗決定顯示內容
  const isWin = result === 'win';
  const playerImg = isWin ? 'player_win.png' : 'player_lose.png';
  const bgImg = isWin ? 'result_win_background.png' : 'result_lose_background.png';
  const charImg = isWin ? `${selectedCharacter}_sad.png` : `${selectedCharacter}_happy.png`;

  const getScale = () => {
    switch (animationState) {
      case 'initial': return 'scale(0.95)';
      case 'bounce': return 'scale(1.05)'; // 微調彈跳幅度
      case 'normal': return 'scale(1)';
      default: return 'scale(1)';
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'none',
    }}>
      {/* 結果背景圖 */}
      <Image
        src={`/images/${bgImg}`}
        alt="結果背景"
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        priority
      />
      {/* x_sad 或 x_happy 貼齊左邊，player_win 或 player_lose 貼齊右邊，兩者上下對齊 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100vw',
        height: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        {/* 左側下注角色表情 */}
        <div style={{
          position: 'absolute',
          left: '10vw',
          top: '50%',
          transform: 'translateY(-50%) scale(2.5)',
          width: 300,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <Image
            src={`/images/${charImg}`}
            alt="下注角色表情"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        {/* 右側 player 狀態圖 */}
        <div style={{
          position: 'absolute',
          right: '10vw',
          top: '50%',
          transform: `translateY(-50%) scale(${isWin ? 2.7 : 2.5})`,
          width: 300,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <Image
            src={`/images/${playerImg}`}
            alt="玩家狀態"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
      {/* 按鈕區域 - 垂直排列，整組在畫面正中央 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        zIndex: 2,
        pointerEvents: 'auto',
      }}>
        <button
          onClick={handlePlayAgain}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            marginBottom: '16px',
            cursor: 'pointer',
            transform: 'scale(2)',
            display: 'block',
          }}
        >
          <Image
            src="/images/btn_playagain.png"
            alt="再玩一次"
            width={128}
            height={48}
            style={{ objectFit: 'contain' }}
          />
        </button>
        <button
          onClick={handleQuit}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            cursor: 'pointer',
            transform: 'scale(2)',
            display: 'block',
          }}
        >
          <Image
            src="/images/btn_quit.png"
            alt="離開遊戲"
            width={128}
            height={48}
            style={{ objectFit: 'contain' }}
          />
        </button>
      </div>
    </div>
  );
} 