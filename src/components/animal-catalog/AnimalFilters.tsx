
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterValues {
  species: string;
  sex: string;
  status: string;
  search: string;
}

interface AnimalFiltersProps {
  filters: FilterValues;
  onFilterChange: (key: string, value: string) => void;
  onSearch: () => void;
  onResetFilters: () => void;
}

export const AnimalFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onResetFilters 
}: AnimalFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="search">Buscar</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Nome ou descrição"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Button 
              className="bg-paraiso-blue hover:bg-blue-800" 
              onClick={onSearch}
            >
              Buscar
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="species">Espécie</Label>
          <Select
            value={filters.species}
            onValueChange={(value) => onFilterChange('species', value)}
          >
            <SelectTrigger id="species">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="dog">Cães</SelectItem>
              <SelectItem value="cat">Gatos</SelectItem>
              <SelectItem value="horse">Cavalos</SelectItem>
              <SelectItem value="other">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sex">Sexo</Label>
          <Select
            value={filters.sex}
            onValueChange={(value) => onFilterChange('sex', value)}
          >
            <SelectTrigger id="sex">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="male">Macho</SelectItem>
              <SelectItem value="female">Fêmea</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <button
            onClick={onResetFilters}
            className="text-paraiso-blue hover:text-blue-800 hover:underline dark:bg-black dark:text-yellow-400 dark:hover:text-yellow-300 px-3 py-2 rounded"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
};
