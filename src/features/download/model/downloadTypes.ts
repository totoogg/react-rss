import { ICharacter } from '@/shared';

export interface IDownloadProps {
  fileName: string;
  className: string;
  data: { [key: string]: ICharacter };
}
