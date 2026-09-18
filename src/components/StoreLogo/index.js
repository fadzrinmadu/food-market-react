import * as React from 'react'; 
import { Link } from 'react-router-dom';
import { config } from '../../config';

export default function StoreLogo() {
  return (
    <Link to="/">
      <div className="text-orange-600 font-extrabold text-2xl sm:text-3xl lg:text-4xl">{config.site_title}</div>
    </Link>
  )
}
