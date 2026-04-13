import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Lock, FileText } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar';

type SettingsTogglesProps = {
  killSwitch: boolean;
  setKillSwitch: (value: boolean) => void;
  encryption: boolean;
  setEncryption: (value: boolean) => void;
  logging: boolean;
  setLogging: (value: boolean) => void;
};

export default function SettingsToggles({
  killSwitch,
  setKillSwitch,
  encryption,
  setEncryption,
  logging,
  setLogging,
}: SettingsTogglesProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Security Settings</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <Label htmlFor="kill-switch" className="font-medium">Kill Switch</Label>
          </div>
          <Switch id="kill-switch" checked={killSwitch} onCheckedChange={setKillSwitch} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-primary" />
            <Label htmlFor="data-encryption" className="font-medium">Data Encryption</Label>
          </div>
          <Switch id="data-encryption" checked={encryption} onCheckedChange={setEncryption} disabled/>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-primary" />
            <Label htmlFor="connection-logging" className="font-medium">Connection Logging</Label>
          </div>
          <Switch id="connection-logging" checked={logging} onCheckedChange={setLogging} />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
