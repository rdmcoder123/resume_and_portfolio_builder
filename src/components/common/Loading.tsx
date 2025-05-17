import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
}

export default function Loading({ fullScreen = true }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 w-full">
      <Loader2 className="h-6 w-6 animate-spin text-primary-foreground" />
    </div>
  );
}