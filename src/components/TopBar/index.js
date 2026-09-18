import * as React from 'react';
import { useSelector } from 'react-redux';
import { ButtonCircle } from '../ui';
import { Link } from 'react-router-dom';
import FaUser from '@meronex/icons/fa/FaUser';
import StoreLogo from '../StoreLogo';

export default function TopBar() {
  let auth = useSelector(state => state.auth);

  return <div className="flex items-center justify-between gap-3">
    <StoreLogo/>

    <Link to={auth.user ? '/account' : '/login'} className="flex items-center gap-2 shrink-0">
      <div className="hidden sm:inline-block font-bold text-right">
        {auth?.user?.full_name}
      </div>
      <ButtonCircle
        icon={<FaUser/>}
        aria-label={auth.user ? 'Akun saya' : 'Masuk'}
      />
    </Link>
  </div>
}
