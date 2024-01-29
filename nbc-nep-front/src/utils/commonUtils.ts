import { ChatType } from "@/components/metaverse/types/ChatType";

export const formatDate = (date: Date | string | undefined, type: ChatType) => {
  if (!date) return "시간이 안나오네요";

  if (typeof date === "string") date = new Date(date);

  const year = date?.getFullYear();
  const month = String(date?.getMonth()! + 1).padStart(2, "0");
  const day = String(date?.getDate()).padStart(2, "0");
  const hours = String(date?.getHours()).padStart(2, "0");
  const minutes = String(date?.getMinutes()).padStart(2, "0");
  const seconds = String(date?.getSeconds()).padStart(2, "0");

  switch (type) {
    case "GLOBAL":
      return `${hours}:${minutes}:${seconds}`;
    case "DM":
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    default:
      return "";
  }
};
