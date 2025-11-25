import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn-io/popover";
import { Button } from "./shadcn-io/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./shadcn-io/command";
export type OptionType =string;
export default function  Combobox({
  open,
  setOpen,
  selected,
  data,
  handleSelect,
  type,
  disable,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: OptionType[] | OptionType | null;
  data: OptionType[];
  handleSelect: (value: string) => void;

  type: "issue";
  disable?: boolean;
}) {
  return (
    <Popover open={open && !disable} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disable}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex justify-between items-start text-text-color font-poppins flex-1 cursor-pointer "
          onClick={() => setOpen((prev) => !prev)}
        >
          {type === "issue" ? (
            Array.isArray(selected) && selected.length > 0 ? (
              <p>
                {selected[0].length > 25
                  ? selected[0].slice(0, 25) + "..."
                  : selected[0]}
                {selected.length > 1 && ` +${selected.length - 1} more`}
              </p>
            ) : (
              `Select issue`
            )
          ) : selected && !Array.isArray(selected) ? (
            <p>
              {selected.length > 36
                ? selected.slice(0, 36) + "..."
                : selected}
            </p>
          ) : (
            `Select ${type}`
          )}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[-(--radix-popover-trigger-width)] m-0 p-0 bg-white rounded-md shadow-lg">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} className="h-9 text-text-color" />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => {
                return (
                  <CommandItem
                    className="text-text-color font-poppins cursor-pointer"
                    key={index}
                    value={item}
                    onSelect={() => handleSelect(item)}
                  >
                    {item}

                    <Check
                      className={cn(
                        "ml-auto",

                        type === "issue"
                          ? Array.isArray(selected) &&
                            selected.some((emp) => emp === item)
                            ? "opacity-100"
                            : "opacity-0"
                          : selected && selected === item
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
