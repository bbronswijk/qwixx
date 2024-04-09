import { Change } from '@/state/store';
import { TileType } from '@/data/tile.model';

export const hasMetRequirements = (changes: Change[], type: TileType) => changes.filter((change) => 'type' in change && change.type === type).length === 2;