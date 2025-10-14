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
import { Tool } from '@/types/tool';

interface ToolsActionsProps {
  tools: Tool[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function ToolsActions({
  tools,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}: ToolsActionsProps) {
  // TODO: Get this from db
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Buscar herramientas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={categoryFilter}
        onValueChange={(value: string) => setCategoryFilter(value)}
      >
        <SelectTrigger className="w-40">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
