import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  company: string;
  position: string;
  location: string;
  duration: string;
  icon: string;
  children?: React.ReactNode;
}

export function ExperienceCard({
  company,
  position,
  location,
  duration,
  icon,
  children,
}: ExperienceProps) {
  return (
    <div className="p-3 flex flex-col gap-1.5 border-0 shadow-none border-b border-border rounded-none">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img
              width="20px"
              src={`${import.meta.env.BASE_URL}icon/${icon}`}
              alt={`${company} logo`}
              className="rounded-sm"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
              {company}
            </h3>
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {position}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 min-w-[120px] text-right">
          <Badge variant="secondary" className="text-xs whitespace-nowrap mb-1">
            {duration}
          </Badge>
          <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 justify-end">
            <MapPin size="12" /> {location}
          </p>
        </div>
      </div>
      <div className="text-left">{children}</div>
    </div>
  );
}
