import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGame } from '@/components/game/GameContext';
import { useState, useEffect } from 'react';

export default function CharacterSelection() {
  const router = useRouter();
  const { setSelectedCharacter } = useGame();
  const [selectedId, setSelectedId] = useState(null);
  const [animationState, setAnimationState] = useState('initial');

  useEffect(() => {
    setAnimationState('bounce');
    setTimeout(() => {
      setAnimationState('normal');
    }, 500);
  }, []);

  const handleNext = () => {
    if (!selectedId) return; // 如果沒有選擇角色，直接返回
    
    setSelectedCharacter(selectedId); // 確保設置選擇的角色
    router.push('/game/RaceScene'); // 直接跳轉，不使用動畫延遲
  };

  const handleSelect = (charId) => {
    setSelectedId(charId);
    setSelectedCharacter(charId); // 選擇時就設置角色
  };

  const getScale = () => {
    switch (animationState) {
      case 'initial': return 'scale(0.95)';
      case 'bounce': return 'scale(1.1)';
      case 'normal': return 'scale(1)';
      default: return 'scale(1)';
    }
  };

  const characters = [
    { id: 'principal', name: '校長', image: 'principal_happy.png' },
    { id: 'director', name: '教導主任', image: 'director_happy.png' },
    { id: 'guard', name: '保全', image: 'guard_happy.png' },
  ];

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#1a237e',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 選擇面板背景 - 添加動畫效果 */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: getScale(),
        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }}>
        <div style={{ 
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '1200px',
          maxHeight: '800px'
        }}>
          <Image
            src="/images/select_panel.png"
            alt="角色選擇"
            fill
            style={{ 
              objectFit: 'contain',
              padding: '40px'
            }}
            priority
          />
        </div>
      </div>

      {/* 角色選擇按鈕 - 添加動畫效果 */}
      <div style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) ${getScale()}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
        zIndex: 1,
        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }}>
        {characters.map((char, index) => (
          <button
            key={char.id}
            onClick={() => handleSelect(char.id)}
            style={{ 
              position: 'relative',
              width: selectedId === char.id ? '260px' : '240px',
              height: selectedId === char.id ? '260px' : '240px',
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: selectedId === char.id ? 'scale(1.1)' : 'scale(1)',
              margin: '0 1px'
            }}
          >
            <Image
              src={`/images/${char.image}`}
              alt={char.name}
              fill
              style={{ objectFit: 'contain' }}
            />
          </button>
        ))}
      </div>

      {/* 下一步按鈕 - 添加動畫效果 */}
      <button
        onClick={handleNext}
        style={{ 
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: `translateX(-50%) ${getScale()}`,
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: selectedId ? 'pointer' : 'not-allowed',
          zIndex: 2,
          opacity: selectedId ? 1 : 0.5,
          transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
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
  );
} 