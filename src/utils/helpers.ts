import { format } from "date-fns";

export function formatDate(dateStr: string) {
  return format(new Date(dateStr), "d-MMM-yyy");
}
