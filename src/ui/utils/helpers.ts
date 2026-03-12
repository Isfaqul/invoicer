import { format } from "date-fns";

export function formatDate(date: number) {
  return format(new Date(date), "d-MMM-yyy");
}
