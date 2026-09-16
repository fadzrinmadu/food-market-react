import * as React from 'react';
import { node, number, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';

export default function LayoutSidebar({
  sidebar,
  content,
  sidebarSize,
  sidebarPosition,
  contentOverflow,
}) {
  const baseClasses = classNames(
    'flex',
    sidebarPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
    'w-full'
  );

  return (
    <div className={baseClasses}>
      <div className="flex-none" style={{ width: sidebarSize }}>
        {sidebar}
      </div>
      <div className={classNames('flex-1', `overflow-${contentOverflow}`)}>{content}</div>
    </div>
  );
}

LayoutSidebar.defaultProps = {
  sidebarSize: 300,
  sidebarPosition: 'left',
  contentOverflow: 'hidden',
};

LayoutSidebar.propTypes = {
  /** konten sidebar */
  sidebar: node,
  /** konten utama */
  content: node,
  /** lebar sidebar dalam piksel */
  sidebarSize: number,
  sidebarPosition: oneOf(['left', 'right']),
  contentOverflow: oneOf(['hidden', 'auto', 'visible']),
};
