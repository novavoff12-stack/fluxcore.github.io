import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";

export default function VerifiedBadge({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <IconRosetteDiscountCheckFilled
      className={`text-blue-500 flex-shrink-0 ${className}`}
      aria-label="Verified Partner"
    />
  );
}
