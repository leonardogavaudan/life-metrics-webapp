import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeRange } from "@/types/metrics";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  options: { value: TimeRange; label: string }[];
  className?: string;
}

export const TimeRangeSelector = ({
  value,
  onChange,
  options,
  className = "w-[180px]",
}: TimeRangeSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`${className} transition-all duration-200 hover:border-slate-500`}>
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
