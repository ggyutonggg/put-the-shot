// src/pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GameProvider } from '@/components/game/GameContext';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/game/RulesPanel');
  }, []);

  return null;
}
