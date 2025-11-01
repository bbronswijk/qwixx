import { cn } from "@/utils/cn";
import { XIcon } from "@/ui/icons";

interface ComponentProps {
  className: string;
  checked: boolean;
}

export const bonusBoxState = {
  checked: "checked",
  unchecked: "unchecked",
} as const;

export default function BonusBox({ checked, className }: ComponentProps) {
  return (
    <div
      data-testid='bonus-box'
      data-state={checked ? bonusBoxState.checked : bonusBoxState.unchecked}
      className={cn("h-5 w-5 rounded border-4 border-white font-bold text-white shadow lg:h-8 lg:w-8 lg:border-[6px]", className)}
    >
      {checked && <XIcon />}
    </div>
  );
}
