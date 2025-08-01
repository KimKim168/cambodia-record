import React, { useState } from "react";
import { Check } from "lucide-react";

// UI Components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

const languages = [
  {
    value: "en",
    label: "English",
    flag: "/assets/icons/english.png",
  },
  {
    value: "kh",
    label: "Khmer",
    flag: "/assets/demo-images/kh.png",
  },
];

export function MyLanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("en");

  const selectedLanguage = languages.find((lang) => lang.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-label="Select Language"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={selectedLanguage?.flag}
            alt={`${selectedLanguage?.label} flag`}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200 capitalize">
            {selectedLanguage?.label}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-md z-50">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={() => {
                    if (language.value !== value) {
                      setValue(language.value);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <img
                    src={language.flag}
                    alt={language.label}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {language.label}
                  </span>
                  <Check
                    className={`ml-auto text-green-600 dark:text-green-400 ${
                      value === language.value ? "opacity-100" : "opacity-0"
                    }`}
                    size={16}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
