import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { MoreHorizontal, Trash2, MailCheck, MailX, Mail } from 'lucide-react';
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
import { Subscriber, GetSubscribersResponse } from '@/types/subscriber';
import { toast } from 'sonner';
import {
  updateSubscriber,
  deleteSubscriber,
  resendVerificationEmail,
} from '@/services/subscriber-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import { format, isBefore } from 'date-fns';

interface SubscribersTableProps {
  subscribers: GetSubscribersResponse;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRefresh?: () => void;
}

export default function SubscribersTable({
  subscribers,
  isLoading,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: SubscribersTableProps) {
  const [updatingSubscriberId, setUpdatingSubscriberId] = React.useState<
    number | null
  >(null);
  const [deletingSubscriberId, setDeletingSubscriberId] = React.useState<
    number | null
  >(null);
  const [resendingVerificationId, setResendingVerificationId] = React.useState<
    number | null
  >(null);

  const handleToggleStatus = async (subscriber: Subscriber) => {
    setUpdatingSubscriberId(subscriber.id);
    try {
      const newStatus =
        subscriber.status === 'SUBSCRIBED' ? 'UNSUBSCRIBED' : 'SUBSCRIBED';
      const response = await updateSubscriber(subscriber.id, {
        status: newStatus,
      });
      if (response.data) {
        toast.success(
          `Subscriber ${newStatus === 'SUBSCRIBED' ? 'subscribed' : 'unsubscribed'} successfully`
        );
        onRefresh?.();
      } else {
        toast.error(response.message || 'Failed to update subscriber');
      }
    } catch (error) {
      toast.error('Failed to update subscriber');
      console.error(error);
    } finally {
      setUpdatingSubscriberId(null);
    }
  };

  const handleDelete = async (subscriber: Subscriber) => {
    setDeletingSubscriberId(subscriber.id);
    try {
      const response = await deleteSubscriber(subscriber.id);
      if (response.data) {
        toast.success(`Subscriber deleted successfully`);
        onRefresh?.();
      } else {
        toast.error(response.message || 'Failed to delete subscriber');
      }
    } catch (error) {
      toast.error('Failed to delete subscriber');
      console.error(error);
    } finally {
      setDeletingSubscriberId(null);
    }
  };

  const isTokenExpired = (subscriber: Subscriber): boolean => {
    if (!subscriber.tokenExpiresAt) {
      return true;
    }

    return isBefore(new Date(subscriber.tokenExpiresAt), Date.now());
  };

  const handleResendVerification = async (
    subscriber: Subscriber,
    force: boolean = false
  ) => {
    setResendingVerificationId(subscriber.id);
    const promise = resendVerificationEmail(subscriber.id, force);

    toast.promise(promise, {
      loading: 'Sending verification email...',
      success: (response) => {
        if (response.data) {
          onRefresh?.();
          return 'Verification email sent successfully';
        }
        throw new Error(
          response.message || 'Failed to send verification email'
        );
      },
      error: (error) => {
        return error instanceof Error
          ? error.message
          : 'Failed to send verification email';
      },
      finally: () => {
        setResendingVerificationId(null);
      },
    });
  };

  const columns: DashboardTableColumn<Subscriber>[] = [
    {
      key: 'email',
      label: 'Email',
      render: (subscriber) => (
        <div className="flex w-[320px] items-center gap-2">
          <div className="text-sm font-medium">{subscriber.email}</div>
          {subscriber.verified && (
            <Badge variant="outline" className="text-xs">
              Verified
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (subscriber) => {
        const isSubscribed = subscriber.status === 'SUBSCRIBED';
        return (
          <Badge
            variant={isSubscribed ? 'default' : 'secondary'}
            className={isSubscribed ? 'bg-green-600' : 'bg-gray-600'}
          >
            {subscriber.status}
          </Badge>
        );
      },
    },
    {
      key: 'verified',
      label: 'Verified',
      render: (subscriber) => (
        <Badge variant={subscriber.verified ? 'default' : 'outline'}>
          {subscriber.verified ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (subscriber) => (
        <div className="flex w-[100px] flex-col gap-1 text-sm">
          <p>{format(new Date(subscriber.createdAt), 'dd/MM/yyyy')}</p>
        </div>
      ),
    },
    {
      key: 'unsubscribedAt',
      label: 'Unsubscribed',
      render: (subscriber) => (
        <div className="flex w-[100px] flex-col gap-1 text-sm text-gray-500">
          {subscriber.unsubscribedAt ? (
            <p>{format(new Date(subscriber.unsubscribedAt), 'dd/MM/yyyy')}</p>
          ) : (
            <p>-</p>
          )}
        </div>
      ),
    },
  ];

  const renderActions = (subscriber: Subscriber) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!subscriber.verified &&
          (isTokenExpired(subscriber) ? (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleResendVerification(subscriber, false);
              }}
              disabled={resendingVerificationId === subscriber.id}
            >
              <Mail className="mr-2 h-4 w-4" />
              Resend Verification Email
            </DropdownMenuItem>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={resendingVerificationId === subscriber.id}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Resend verification email?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The verification token for{' '}
                    <strong>&quot;{subscriber.email}&quot;</strong> has not
                    expired yet. Resending the email will invalidate the current
                    token and generate a new one. Are you sure you want to
                    continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleResendVerification(subscriber, true)}
                    disabled={resendingVerificationId === subscriber.id}
                  >
                    {resendingVerificationId === subscriber.id
                      ? 'Sending...'
                      : 'Resend Email'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              disabled={updatingSubscriberId === subscriber.id}
            >
              {subscriber.status === 'SUBSCRIBED' ? (
                <>
                  <MailX className="mr-2 h-4 w-4" />
                  Unsubscribe
                </>
              ) : (
                <>
                  <MailCheck className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {subscriber.status === 'SUBSCRIBED'
                  ? 'Unsubscribe subscriber?'
                  : 'Subscribe subscriber?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will{' '}
                {subscriber.status === 'SUBSCRIBED'
                  ? 'unsubscribe'
                  : 'subscribe'}{' '}
                <strong>&quot;{subscriber.email}&quot;</strong>.
                {subscriber.status === 'SUBSCRIBED'
                  ? ' They will no longer receive newsletter emails.'
                  : ' They will start receiving newsletter emails again.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleToggleStatus(subscriber)}
                disabled={updatingSubscriberId === subscriber.id}
              >
                {updatingSubscriberId === subscriber.id
                  ? 'Processing...'
                  : subscriber.status === 'SUBSCRIBED'
                    ? 'Unsubscribe'
                    : 'Subscribe'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
              disabled={deletingSubscriberId === subscriber.id}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete subscriber?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete{' '}
                <strong>&quot;{subscriber.email}&quot;</strong> from your
                subscriber list. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(subscriber)}
                disabled={deletingSubscriberId === subscriber.id}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deletingSubscriberId === subscriber.id
                  ? 'Deleting...'
                  : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardTable
      data={subscribers.items}
      columns={columns}
      isLoading={isLoading}
      getRowKey={(subscriber) => `subscriber-${subscriber.id}`}
      actions={renderActions}
      pagination={subscribers.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
