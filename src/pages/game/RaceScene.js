import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGame } from '@/components/game/GameContext';

export default function RaceScene() {
  const router = useRouter();
  const { selectedCharacter, setResult } = useGame();
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const [positions, setPositions] = useState({
    principal: 0,
    director: 0,
    guard: 0,
  });
  const [finished, setFinished] = useState({
    principal: false,
    director: false,
    guard: false,
  });
  const [speedProfile, setSpeedProfile] = useState(null);
  const [lastLoser, setLastLoser] = useState(null);

  useEffect(() => {
    // 每場比賽三個角色的速度 profile 固定為 0.01~1.5
    const randomProfile = {
      principal: { min: 0.01, max: 1.5 },
      director: { min: 0.01, max: 1.5 },
      guard: { min: 0.01, max: 1.5 }
    };
    setSpeedProfile(randomProfile);
  }, []);

  useEffect(() => {
    if (!isRaceStarted || !speedProfile) return;
    const interval = setInterval(() => {
      setPositions(prev => {
        const newPositions = { ...prev };
        const characters = ['principal', 'director', 'guard'];
        const finishedChars = characters.filter(c => finished[c] || prev[c] >= 100);
        // 如果已經有兩名到終點，找出剩下的最後一名
        if (finishedChars.length === 2 && !lastLoser) {
          const loser = characters.find(c => !finishedChars.includes(c));
          setLastLoser(loser);
          // 讓最後一名直接停下
          newPositions[loser] = prev[loser];
          // 其他角色保持在終點
          finishedChars.forEach(c => { newPositions[c] = 100; });
          return newPositions;
        }
        // 正常移動
        characters.forEach(char => {
          if (!finished[char] && (!lastLoser || char !== lastLoser)) {
            let speed = Math.random() * (speedProfile[char].max - speedProfile[char].min) + speedProfile[char].min;
            if (Math.random() < 0.2) {
              speed += Math.random() * 1.5 + 0.5;
            }
            newPositions[char] = Math.min(prev[char] + speed, 100);
            if (newPositions[char] >= 100) {
              setFinished(prev => ({ ...prev, [char]: true }));
            }
          }
        });
        return newPositions;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isRaceStarted, finished, selectedCharacter, router, setResult, speedProfile, lastLoser]);

  // 跳轉到結果頁，停留2秒
  useEffect(() => {
    const characters = ['principal', 'director', 'guard'];
    const finishedChars = characters.filter(c => finished[c]);
    if (finishedChars.length === 2 && lastLoser) {
      setTimeout(() => {
        // 修正：下注角色是最後一名才算 win
        const isWin = lastLoser === selectedCharacter;
        setResult(isWin ? 'win' : 'lose');
        router.push('/game/ResultScreen');
      }, 2000);
    }
  }, [finished, lastLoser, selectedCharacter, setResult, router]);

  const handleStart = () => {
    setIsRaceStarted(true);
  };

  const runners = [
    { id: 'principal', image: finished.principal ? 'principal_happy.png' : 'runner_principal_run.png', position: positions.principal },
    { id: 'director', image: finished.director ? 'director_happy.png' : 'runner_director_run.png', position: positions.director },
    { id: 'guard', image: finished.guard ? 'guard_happy.png' : 'runner_guard_run.png', position: positions.guard },
  ];

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#1a237e',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景 */}
      <Image
        src="/images/race_background.png"
        alt="比賽背景"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      
      {/* 開始按鈕 - 放大 1.5 倍 */}
      {!isRaceStarted && (
        <button
          onClick={handleStart}
          style={{ 
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%) scale(1.5)',
            zIndex: 10,
            border: 'none',
            background: 'none',
            padding: 0
          }}
        >
          <Image
            src="/images/btn_start.png"
            alt="開始比賽"
            width={128}
            height={48}
            style={{ objectFit: 'contain' }}
          />
        </button>
      )}
      
      {/* 跑道容器 - 放大 1.5 倍並調整位置 */}
      <div style={{
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: 'translateX(-50%) scale(1.5)',
        width: '80%',
        height: '300px',
        zIndex: 1,
        transformOrigin: 'center bottom'
      }}>
        {/* 跑道背景 */}
        <Image
          src="/images/track_overlay.png"
          alt="跑道"
          fill
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center bottom'
          }}
        />

        {/* 角色橫向排列在三條賽道上 */}
        {runners.map((runner, index) => {
          const laneCount = 3;
          const laneHeight = 300 / laneCount;
          const top = laneHeight * index + laneHeight / 2 - 110;
          const left = `calc(${20 + runner.position * 0.4}vw - 72.5px)`;
          // 根據 lastLoser 決定表情
          let img = runner.image;
          if (lastLoser && runner.id === lastLoser) {
            img = `${runner.id}_sad.png`;
          }
          return (
            <div
              key={runner.id}
              style={{
                position: 'absolute',
                width: '145px',
                height: '145px',
                top: `${top}px`,
                left,
                transition: 'left 0.1s linear, top 0.1s linear',
              }}
            >
              <Image
                src={`/images/${img}`}
                alt={`${runner.id} ${lastLoser && runner.id === lastLoser ? 'sad' : finished[runner.id] ? '開心' : '跑步'}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}