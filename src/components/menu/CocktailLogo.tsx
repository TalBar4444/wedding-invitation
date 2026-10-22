import { COCKTAIL_W } from '@/layouts/registry';
import { BlankCrop } from './BlankCrop';
import { PaperPatch } from './PaperPatch';

export function CocktailLogo() {
  const coverW = 284;
  return (
    <>
      <PaperPatch top={0} left={(COCKTAIL_W - coverW) / 2} width={coverW} height={378} />
      <BlankCrop boxTop={26} boxW={280} boxH={250} srcTop={18} scale={0.64} zIndex={2} pageW={COCKTAIL_W} />
    </>
  );
}
