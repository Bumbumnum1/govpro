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
export type OptionType = { id: string; label: string };
export default function Combobox({
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
          className="flex justify-between items-start text-[#3e3e3e] font-poppins w-full h-full cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {type === "issue" ? (
            Array.isArray(selected) && selected.length > 0 ? (
              <p>
                {selected[0].label.length > 25
                  ? selected[0].label.slice(0, 25) + "..."
                  : selected[0].label}
                {selected.length > 1 && ` +${selected.length - 1} more`}
              </p>
            ) : (
              `Select issue`
            )
          ) : selected && !Array.isArray(selected) ? (
            <p>
              {selected.label.length > 36
                ? selected.label.slice(0, 36) + "..."
                : selected.label}
            </p>
          ) : (
            `Select ${type}`
          )}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[-(--radix-popover-trigger-width)] m-0 p-0 bg-white rounded-md shadow-lg">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} className="h-9 text-[#3e3e3e]" />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => {
                return (
                  <CommandItem
                    className="text-[#3e3e3e] font-poppins cursor-pointer"
                    key={index}
                    value={item.label}
                    onSelect={() => handleSelect(item.id)}
                  >
                    {item.label}

                    <Check
                      className={cn(
                        "ml-auto",

                        type === "issue"
                          ? Array.isArray(selected) &&
                            selected.some((emp) => emp.id === item.id)
                            ? "opacity-100"
                            : "opacity-0"
                          : selected && (selected as OptionType).id === item.id
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
