import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Power, ShieldCheck, ShieldOff, Wifi, WifiOff, LoaderCircle } from 'lucide-react';
import type { Server } from '@/lib/data';
import { cn } from '@/lib/utils';

type ConnectionStatusProps = {
  isConnected: boolean;
  isConnecting: boolean;
  onToggle: () => void;
  server: Server;
  yourIp: string;
  maskedIp: string;
};

export default function ConnectionStatus({
  isConnected,
  isConnecting,
  onToggle,
  server,
  yourIp,
  maskedIp,
}: ConnectionStatusProps) {
  const StatusIcon = isConnected ? ShieldCheck : ShieldOff;
  const statusColor = isConnected ? 'text-green-500' : 'text-destructive';
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Connection Status</CardTitle>
            <div className={cn("flex items-center gap-2 font-medium", statusColor)}>
                <StatusIcon className="h-5 w-5" />
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
        </div>
        <CardDescription>
          {isConnected ? `Securely connected via ${server.name}` : 'You are not connected to a VPN.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8 text-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
            {isConnected && (
                <div className="absolute h-full w-full animate-pulse rounded-full bg-green-500/20"></div>
            )}
            {isConnecting && (
                <div className="absolute h-full w-full animate-spin rounded-full border-4 border-dashed border-primary"></div>
            )}
            <div className={cn("flex h-36 w-36 items-center justify-center rounded-full border-8", isConnected ? "border-green-500" : "border-muted")}>
                <StatusIcon className={cn("h-16 w-16 transition-colors", statusColor)} />
            </div>
        </div>
        
        <Button
          size="lg"
          className="w-full max-w-xs rounded-full py-8 text-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          onClick={onToggle}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Power className="mr-2 h-6 w-6" />
          )}
          {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
        </Button>
        
        <div className="grid w-full grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-3 text-left">
                <p className="flex items-center gap-2 font-semibold text-muted-foreground"><WifiOff className="h-4 w-4"/> Your IP Address</p>
                <p className="truncate font-mono text-base">{yourIp}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-left">
                <p className="flex items-center gap-2 font-semibold text-muted-foreground"><Wifi className="h-4 w-4"/> Masked IP Address</p>
                <p className="truncate font-mono text-base">{isConnected ? maskedIp : '---.---.---.---'}</p>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
