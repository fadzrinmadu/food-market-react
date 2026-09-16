import * as React from 'react';
import { Link } from 'react-router-dom';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';

import { ButtonCircle } from '../ui';

export default function BackButton({ to = '/' }) {
  return (
    <Link to={to}>
      <ButtonCircle icon={<FaArrowLeft />} aria-label="Kembali" />
    </Link>
  );
}
