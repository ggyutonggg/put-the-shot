import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RulesPanel() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState('initial'); // 'initial' -> 'bounce' -> 'normal'

  useEffect(() => {
    // 組件掛載後觸發動畫序列
    setAnimationState('bounce');
    setTimeout(() => {
      setAnimationState('normal');
    }, 500);
  }, []);

  const handleNext = () => {
    const button = document.querySelector('button[onClick="handleNext"]');
    if (button) {
      button.style.transform = 'translateX(-50%) scale(1.2)';
      setTimeout(() => {
        router.push('/game/CharacterSelection');
      }, 300);
    } else {
      router.push('/game/CharacterSelection');
    }
  };

  const getScale = () => {
    switch (animationState) {
      case 'initial': return 'scale(0.95)';
      case 'bounce': return 'scale(1.1)';
      case 'normal': return 'scale(1)';
      default: return 'scale(1)';
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#1a237e',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 所有 PNG 圖片容器 - 包含彈跳動畫 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: getScale(),
        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }}>
        {/* 規則面板背景 */}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            maxWidth: '1200px',
            maxHeight: '800px'
          }}>
            <Image
              src="/images/rules_panel.png"
              alt="遊戲規則"
              fill
              style={{ 
                objectFit: 'contain',
                padding: '40px'
              }}
              priority
            />
          </div>
        </div>

        {/* 下一步按鈕 */}
        <button
          onClick={handleNext}
          style={{ 
            position: 'absolute',
            bottom: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: 'none',
            background: 'none',
            padding: 0,
            cursor: 'pointer',
            zIndex: 2,
            transition: 'transform 0.3s ease'
          }}
        >
          <Image
            src="/images/btn_next.png"
            alt="下一步"
            width={320}
            height={120}
            style={{ objectFit: 'contain' }}
          />
        </button>
      </div>
    </div>
  );
} 