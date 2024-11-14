import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Icon } from "lucide-react";
import { avocado } from "@lucide/lab";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Icon iconNode={avocado} className="h-8 w-8 text-emerald-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 text-transparent bg-clip-text">
            Palta Finance
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
