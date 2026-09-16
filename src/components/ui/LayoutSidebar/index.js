import * as React from 'react';
import { bool, node, number, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';

export default function LayoutSidebar({
  sidebar,
  content,
  sidebarSize = 300,
  sidebarPosition = 'left',
  contentOverflow = 'hidden',
  hideSidebarOnMobile = false,
}) {
  const baseClasses = classNames(
    'flex',
    sidebarPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
    'w-full'
  );

  return (
    <div className={baseClasses}>
      <div
        className={classNames('flex-none', hideSidebarOnMobile && 'hidden md:block')}
        style={{ width: sidebarSize }}
      >
        {sidebar}
      </div>
      <div className={classNames('flex-1', `overflow-${contentOverflow}`)}>{content}</div>
    </div>
  );
}

LayoutSidebar.propTypes = {
  /** konten sidebar */
  sidebar: node,
  /** konten utama */
  content: node,
  /** lebar sidebar dalam piksel */
  sidebarSize: number,
  sidebarPosition: oneOf(['left', 'right']),
  contentOverflow: oneOf(['hidden', 'auto', 'visible']),
  /** sembunyikan sidebar di layar < md; dipakai saat kontennya dipindah ke tempat lain untuk mobile */
  hideSidebarOnMobile: bool,
};
