import React from 'react';
import { Game, GameStatus } from '@/types/gaming';
import { Gamepad2, Layers, CheckCircle2 } from 'lucide-react';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';

interface GamesStatsProps {
  games: Game[];
  isLoading: boolean;
}

export default function GamesStats({ games, isLoading }: GamesStatsProps) {
  const totalGames = games.length;
  const playingCount = games.filter(
    (g) => g.status === GameStatus.PLAYING
  ).length;
  const backlogCount = games.filter(
    (g) => g.status === GameStatus.BACKLOG
  ).length;
  const completedCount = games.filter(
    (g) => g.status === GameStatus.COMPLETED
  ).length;

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      <DashboardStatsCard
        title="Total Games"
        value={totalGames}
        description="All games"
        icon={Gamepad2}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Playing"
        value={playingCount}
        description="Currently playing"
        icon={Gamepad2}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Backlog"
        value={backlogCount}
        description="In backlog"
        icon={Layers}
        isLoading={isLoading}
      />
      <DashboardStatsCard
        title="Completed"
        value={completedCount}
        description="Finished games"
        icon={CheckCircle2}
        isLoading={isLoading}
      />
    </div>
  );
}
