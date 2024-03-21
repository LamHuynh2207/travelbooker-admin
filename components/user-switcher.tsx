"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUserModal } from "@/hooks/use-user-modal"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface UserSwitcherProps extends PopoverTriggerProps {
    className?: string;
    items: Record<string, any>[];
}
export default function UserSwitcher({ className, items = [] }: UserSwitcherProps) {
  const UserModal = useUserModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentUser = formattedItems.find((item) => item.value === params.UserId);

  const [open, setOpen] = React.useState(false)

  const onUserSelect = (User: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${User.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a User"
          className={cn("w-[200px] justify-between", className)}
        >
          <User className="mr-2 h-4 w-4" />
          {currentUser?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search User..." />
            <CommandEmpty>No User found.</CommandEmpty>
            <CommandGroup heading="Users">
              {formattedItems.map((User) => (
                <CommandItem
                  key={User.value}
                  onSelect={() => onUserSelect(User)}
                  className="text-sm"
                >
                  <User className="mr-2 h-4 w-4" />
                  {User.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentUser?.value === User.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  UserModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create User
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};