import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SubscribersActionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  verifiedFilter: string;
  setVerifiedFilter: (value: string) => void;
}

export default function SubscribersActions({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  verifiedFilter,
  setVerifiedFilter,
}: SubscribersActionsProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={statusFilter}
        onValueChange={(value: string) => setStatusFilter(value)}
      >
        <SelectTrigger className="w-40">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="SUBSCRIBED">Subscribed</SelectItem>
          <SelectItem value="UNSUBSCRIBED">Unsubscribed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={verifiedFilter}
        onValueChange={(value: string) => setVerifiedFilter(value)}
      >
        <SelectTrigger className="w-40">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Verified</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
