import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Game, GameStatus } from '@/types/gaming';
import { toast } from 'sonner';
import { deleteGame } from '@/services/gaming-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import { PaginatedResponse } from '@/types/pagination';
import Link from 'next/link';
import Image from 'next/image';

interface GamesTableProps {
  games: PaginatedResponse<Game>;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRefresh?: () => void;
}

export default function GamesTable({
  games,
  isLoading,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: GamesTableProps) {
  const handleDeleteGame = async (gameId: string) => {
    toast.promise(deleteGame(gameId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `Game ${data?.title} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const getStatusBadge = (status: GameStatus) => {
    const variants: Record<GameStatus, { className: string; label: string }> = {
      [GameStatus.PLAYING]: {
        className: 'bg-green-800 text-green-100',
        label: 'Playing',
      },
      [GameStatus.BACKLOG]: {
        className: 'bg-yellow-800 text-yellow-100',
        label: 'Backlog',
      },
      [GameStatus.COMPLETED]: {
        className: 'bg-blue-800 text-blue-100',
        label: 'Completed',
      },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const columns: DashboardTableColumn<Game>[] = [
    {
      key: 'title',
      label: 'Game',
      render: (game) => (
        <div className="flex w-[480px] items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={game.cover || '/placeholder.svg'}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <div className="text-sm font-medium">{game.title}</div>
            <div className="text-sm text-gray-500">{game.platform}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (game) => getStatusBadge(game.status),
    },
    {
      key: 'isCurrent',
      label: 'Current',
      render: (game) =>
        game.isCurrent ? (
          <Badge className="bg-primary text-primary-foreground">Current</Badge>
        ) : null,
    },
  ];

  const renderActions = (game: Game) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/gaming/games/edit/${game.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {game.title}. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteGame(game.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardTable
      data={games.items}
      columns={columns}
      isLoading={isLoading}
      pagination={games.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      actions={renderActions}
      getRowKey={(game) => `game-${game.id}`}
    />
  );
}
