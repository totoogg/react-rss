import { FC, useCallback } from 'react';
import { Button } from '@/shared';
import { IDownloadProps } from '../model/downloadTypes';

export const Download: FC<IDownloadProps> = ({ data, fileName, className }) => {
  const download = useCallback(() => {
    const string = [
      ['N', 'Name', 'Films', 'Birthday year', 'URL'],
      ...Object.values(data).map((item, i) => [
        i + 1,
        item.name,
        item.films,
        item.birth_year,
        item.url,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');
    const fileExtension = fileName.split('.').reverse()[0];
    const blob = new Blob([string], { type: `text/${fileExtension}` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName || `download.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, fileName]);

  return (
    <Button onClick={download} className={[className]} classNameButton="flat">
      Download
    </Button>
  );
};
