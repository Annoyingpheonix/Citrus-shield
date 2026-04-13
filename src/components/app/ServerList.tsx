import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import type { Server } from '@/lib/data';
import OptimalServerSuggestion from './OptimalServerSuggestion';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';

type ServerListProps = {
  servers: Server[];
  selectedServer: Server;
  onSelect: (serverId: string) => void;
  isConnected: boolean;
  setSelectedServer: (server: Server) => void;
};

// Helper to get flag emoji from country code
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function ServerList({
  servers,
  selectedServer,
  onSelect,
  isConnected,
  setSelectedServer,
}: ServerListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Server Location</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-4">
        <Select
          value={selectedServer.id}
          onValueChange={onSelect}
          disabled={isConnected}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <SelectValue placeholder="Select a server" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {servers.map((server) => (
              <SelectItem key={server.id} value={server.id}>
                <div className="flex items-center gap-2">
                  <span>{getFlagEmoji(server.countryCode)}</span>
                  <span>{server.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <OptimalServerSuggestion selectedServer={selectedServer} setSelectedServer={setSelectedServer} isConnected={isConnected} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
