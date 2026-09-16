import * as React from 'react';
import { node, string } from 'prop-types';

export default function IconWrapper({ children, className }) {
  return <div className={className}>
    {children}
  </div>
}

IconWrapper.propTypes = {
  children: node,
  className: string,
}
