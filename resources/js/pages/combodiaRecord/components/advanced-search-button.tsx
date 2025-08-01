'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const types = ['Book', 'Magazine', 'Journal'];
const years = ['2023', '2022', '2021'];
const categories = ['History', 'Science', 'Technology'];
const publishers = ['OUP', 'Penguin', 'HarperCollins'];

function DropdownSelect({
  label,
  options,
  selected,
  setSelected,
}: {
  label: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-md border border-white/20 shadow-sm hover:bg-white/20 transition">
        <span className={selected ? 'text-gray-900' : 'text-gray-900'}>
          {selected || label}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-48 rounded-md border border-white/10 bg-white/50 backdrop-blur-md text-gray-900 shadow-lg"
      >
        <DropdownMenuLabel className="text-xs text-gray-900">{label}</DropdownMenuLabel>
        {options.map((option, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => setSelected(option)}
            className="flex items-center justify-between border border-transparent hover:border hover:border-blue-950  text-sm hover:bg-white/10 cursor-pointer"
          >
            {option}
            {selected === option && <Check className="h-4 w-4 text-primary " />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AdvancedSearchButton() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex cursor-pointer items-center space-x-2 text-base text-black underline underline-offset-2">
        <p>Advanced Search</p>
        <ArrowDown className="w-4 h-4" />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <DropdownSelect
          label="Type"
          options={types}
          selected={selectedType}
          setSelected={setSelectedType}
        />
        <DropdownSelect
          label="Year"
          options={years}
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
        <DropdownSelect
          label="Category"
          options={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <DropdownSelect
          label="Publisher"
          options={publishers}
          selected={selectedPublisher}
          setSelected={setSelectedPublisher}
        />
      </div>
    </div>
  );
}
