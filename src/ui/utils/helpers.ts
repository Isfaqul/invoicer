import { format } from "date-fns";

export function formatDate(date: number) {
  return format(new Date(date), "d-MMM-yyy");
}

export function formatDateForInput(date: number) {
  return format(new Date(date), "yyyy-MM-dd");
}

function getOS() {
  if (navigator.userAgent) {
    if (navigator.platform.startsWith("Mac")) return "MacOS";
    else if (navigator.platform.startsWith("Win")) return "Windows";
  }
}

export function getMetKeyPerOS() {
  let platform = getOS();

  if (platform === "MacOS") return "⌘";
  else if (platform === "Windows") return "Ctrl";
}
