import * as React from 'react';
import { node, oneOf, string } from 'prop-types';
import FaExclamationTriangle from '@meronex/icons/fa/FaExclamationTriangle';

import { classNames } from '../utils/class-names';
import { colors, getTextColor } from '../utils/colors';

export default function FormControl({ label, errorMessage, color, children }) {
  const hasError = Boolean(errorMessage && errorMessage.length);

  return (
    <div>
      <label className={classNames('block font-bold mb-2', getTextColor(color))}>{label}</label>
      {children}
      <div
        className={classNames(
          'h-8 text-sm text-red-600 flex items-center',
          hasError ? 'visible' : 'invisible'
        )}
        role="alert"
      >
        <FaExclamationTriangle className="mr-2" /> {errorMessage}
      </div>
    </div>
  );
}

FormControl.defaultProps = {
  label: '',
  errorMessage: '',
};

FormControl.propTypes = {
  /** label untuk input di dalamnya */
  label: string,
  /** warna teks label */
  color: oneOf(colors),
  /** pesan error; area pesan tetap memakan tempat walau kosong */
  errorMessage: string,
  children: node,
};
