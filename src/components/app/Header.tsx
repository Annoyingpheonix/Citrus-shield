'use client'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-transparent px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-2 md:peer-data-[state=expanded]:hidden">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tighter text-foreground">
            Citrus Shield
        </h1>
      </div>
    </header>
  );
}
