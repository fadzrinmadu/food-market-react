import * as React from 'react';

import Card from '../Card';
import Skeleton from '../Skeleton';

export default function CardProductSkeleton() {
  return (
    <Card
      body={
        <div>
          <Skeleton width="100%" height="8rem" rounded="rounded-md" className="mb-4" />
          <div className="flex justify-between items-end">
            <div>
              <Skeleton width="6rem" height="1rem" className="mb-2" />
              <Skeleton width="4rem" height="0.75rem" />
            </div>
            <Skeleton width="2.75rem" height="2.75rem" rounded="rounded-full" />
          </div>
        </div>
      }
    />
  );
}
