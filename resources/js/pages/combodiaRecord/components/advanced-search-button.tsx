'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from '@inertiajs/react';
import { ArrowDown, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

// This is a reusable dropdown component, no changes needed here.
function DropdownSelect({
  label,
  options,
  selected,
  setSelected,
}: {
  label: string;
  // Ensure options can handle numbers for the year
  options: (string | number)[]; 
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
        {/* Use optional chaining in case options is undefined */}
        {options?.map((option, i) => (
          <DropdownMenuItem
            key={i}
            // Convert option to string for comparison and setting state
            onClick={() => setSelected(String(option))} 
            className="flex items-center justify-between border border-transparent hover:border hover:border-blue-950  text-sm hover:bg-white/10 cursor-pointer"
          >
            {option}
            {selected === String(option) && <Check className="h-4 w-4 text-primary " />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AdvancedSearchButton() {
  // 1. Get all filter data from the backend via Inertia props.
  const { types, publisher, category, uniquePostYears } = usePage().props;

  // 2. Prepare the options for the dropdowns.
  //    - Use optional chaining (?.) in case the data is not available.
  //    - The `uniquePostYears` array can be used directly.
  const typeOptions = types?.map(type => type.label);
  const publisherOptions = publisher?.map(p => p.name);
  const categoryOptions = category?.map(c => c.name);

  // 3. Set up state for each selected filter.
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DropdownSelect
          label="Type"
          options={typeOptions}
          selected={selectedType}
          setSelected={setSelectedType}
        />
        <DropdownSelect
          label="Year"
          // Use uniquePostYears directly as it's already an array of years
          options={uniquePostYears} 
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
        <DropdownSelect
          label="Category"
          options={categoryOptions}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <DropdownSelect
          label="Publisher"
          options={publisherOptions}
          selected={selectedPublisher}
          setSelected={setSelectedPublisher}
        />
      </div>
    </div>
  );
}
