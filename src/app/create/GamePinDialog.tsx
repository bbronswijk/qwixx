import { Variant } from "@/context/variant.context";
import { useRouter } from "next/navigation";
import { AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/ui/alert-dialog";
import { GamePadIcon } from "@/ui/icons";
import { DialogHeader } from "@/ui/dialog";

export const GamePinDialog = ({ pin, variant }: { pin: number | null; variant: Variant | undefined }) => {
  const router = useRouter();

  if (!pin) {
    return (
      <AlertDialogContent>
        <DialogHeader>
          <GamePadIcon className='mx-auto h-20 w-20 animate-bounce' />
          <AlertDialogTitle className='text-center'>Creating {variant} game</AlertDialogTitle>
          <AlertDialogDescription className='text-center'>One moment please...</AlertDialogDescription>
        </DialogHeader>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent>
      <DialogHeader>
        <AlertDialogTitle className='text-center'>Game created!</AlertDialogTitle>
        <AlertDialogDescription className='text-center'>Players can join your game with the pin below</AlertDialogDescription>
      </DialogHeader>
      <h1 className='text-center text-8xl font-bold'>{pin}</h1>
      <AlertDialogFooter>
        <AlertDialogCancel>Close</AlertDialogCancel>
        <AlertDialogAction onClick={() => router.push(`/${pin}/${variant}`)}>Start game</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
