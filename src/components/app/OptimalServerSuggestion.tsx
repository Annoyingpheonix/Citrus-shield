import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Sparkles, LoaderCircle, BrainCircuit, CheckCircle } from 'lucide-react';
import { getOptimalServerSuggestion } from '@/app/actions';
import type { SuggestOptimalServerOutput } from '@/ai/flows/suggest-optimal-server';
import { servers, type Server } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type OptimalServerSuggestionProps = {
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
  isConnected: boolean;
};

export default function OptimalServerSuggestion({ selectedServer, setSelectedServer, isConnected }: OptimalServerSuggestionProps) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestOptimalServerOutput | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    setLoading(true);
    setSuggestion(null);
    const result = await getOptimalServerSuggestion();
    setSuggestion(result);
    setLoading(false);
  };

  const handleSelectSuggested = () => {
    if (suggestion && suggestion.optimalServer !== 'Error') {
      const suggested = servers.find(s => s.name === suggestion.optimalServer);
      if (suggested) {
        setSelectedServer(suggested);
        toast({
          title: 'Server Selected',
          description: `${suggested.name} is now your selected server.`,
        });
        setIsOpen(false);
      }
    }
  };

  const isAlreadySelected = suggestion?.optimalServer === selectedServer.name;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Sparkles className="mr-2 h-4 w-4 text-accent-foreground" />
          Suggest Optimal Server
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Optimal Server Suggestion</DialogTitle>
          <DialogDescription>
            Let our AI analyze server performance to suggest the best location for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {!suggestion && !loading && (
             <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full border-8 border-dashed border-muted p-4">
                    <Sparkles className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="max-w-xs text-center text-muted-foreground">
                    Let our AI analyze server speeds and latency to find the perfect connection for you.
                </p>
              <Button onClick={handleSuggest}>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Get Suggestion
              </Button>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 text-center h-40">
              <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing server data...</p>
            </div>
          )}
          {suggestion && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4 text-center">
                  <p className="text-sm text-muted-foreground">Our AI suggests:</p>
                  <p className="text-2xl font-bold text-primary">{suggestion.optimalServer}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-muted-foreground">
                    <BrainCircuit className="h-5 w-5" />
                    <p>AI Reasoning</p>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
              </div>
            </div>
          )}
        </div>
        {(suggestion || loading) && (
            <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
            {suggestion && suggestion.optimalServer !== 'Error' && (
                <Button onClick={handleSelectSuggested} disabled={isConnected || !!isAlreadySelected}>
                    {isAlreadySelected ? (
                        <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Already Selected
                        </>
                    ) : (
                        "Use this Server"
                    )}
                </Button>
            )}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
