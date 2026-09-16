import * as React from 'react';

import Card from '../Card';
import Skeleton from '../Skeleton';

export default function CardProductSkeleton() {
  return (
    <Card
      color="white"
      header={<div />}
      body={
        <div className="flex justify-end">
          <Skeleton width="6rem" height="6rem" rounded="rounded" />
        </div>
      }
      footer={
        <div className="flex justify-between items-end">
          <div>
            <Skeleton width="6rem" height="1rem" className="mb-2" />
            <Skeleton width="4rem" height="0.75rem" />
          </div>
          <Skeleton width="3rem" height="1.5rem" />
        </div>
      }
    />
  );
}
