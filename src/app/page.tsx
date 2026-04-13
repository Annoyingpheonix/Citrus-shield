'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/app/Header';
import ConnectionStatus from '@/components/app/ConnectionStatus';
import ServerList from '@/components/app/ServerList';
import SettingsToggles from '@/components/app/SettingsToggles';
import type { Server } from '@/lib/data';
import { servers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarSeparator } from '@/components/ui/sidebar';
import { Shield } from 'lucide-react';
import SpeedChart from '@/components/app/SpeedChart';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [killSwitch, setKillSwitch] = useState(true);
  const [encryption, setEncryption] = useState(true);
  const [logging, setLogging] = useState(false);
  const [currentIp, setCurrentIp] = useState('198.51.100.1');
  const [maskedIp, setMaskedIp] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Generate a stable "real" IP for the session
    const randomIpPart = () => Math.floor(Math.random() * 254) + 1;
    setCurrentIp(`198.51.${randomIpPart()}.${randomIpPart()}`);
  }, []);

  const handleConnectToggle = () => {
    if (isConnected) {
      setIsConnected(false);
      setMaskedIp('');
      toast({
        title: 'Disconnected',
        description: `Your connection is no longer secure.`,
      });
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        // Generate a plausible masked IP based on server location
        const randomIpPart = () => Math.floor(Math.random() * 254) + 1;
        const ipPrefix = selectedServer.id.startsWith('us-')
          ? '104.25'
          : '45.12';
        setMaskedIp(`${ipPrefix}.${randomIpPart()}.${randomIpPart()}`);
        toast({
          title: 'Connected!',
          description: `You are now securely connected through ${selectedServer.name}.`,
        });
      }, 2000);
    }
  };

  const handleServerSelect = (serverId: string) => {
    const server = servers.find((s) => s.id === serverId);
    if (server) {
      setSelectedServer(server);
    }
  };

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-semibold tracking-tighter text-foreground">
                  Citrus Shield
                </h1>
              </div>
          </SidebarHeader>
          <SidebarContent>
            <ServerList
              servers={servers}
              selectedServer={selectedServer}
              onSelect={handleServerSelect}
              isConnected={isConnected}
              setSelectedServer={setSelectedServer}
            />
            <SidebarSeparator />
            <SettingsToggles
              killSwitch={killSwitch}
              setKillSwitch={setKillSwitch}
              encryption={encryption}
              setEncryption={setEncryption}
              logging={logging}
              setLogging={setLogging}
            />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <div className="relative flex h-svh flex-col font-body text-foreground">
              <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(hsl(var(--accent))_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <ConnectionStatus
                          isConnected={isConnected}
                          isConnecting={isConnecting}
                          onToggle={handleConnectToggle}
                          server={selectedServer}
                          yourIp={currentIp}
                          maskedIp={maskedIp}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <SpeedChart isConnected={isConnected} />
                    </div>
                </div>
              </main>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
