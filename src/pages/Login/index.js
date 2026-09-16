import * as React from 'react'; 
import { Button, Card, FormControl, InputPassword, InputText, LayoutOne } from '../../components/ui';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import StoreLogo from '../../components/StoreLogo';
import { userLogin } from '../../features/Auth/actions';
import { rules } from './validation';
import { login } from '../../api/auth';
import { asyncStatus } from '../../constants/asyncStatus';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [status, setStatus] = React.useState(asyncStatus.idle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({email, password}) => {
    setStatus(asyncStatus.process);

    let { data } = await login(email, password); 

    if (data.error) {
      setError('password', {type: 'invalidCredential', message: data.message});
      setStatus(asyncStatus.error);
    } else {
      let {user, token} = data;
      dispatch(userLogin(user, token));
      navigate('/');
    }

    setStatus(asyncStatus.success);
  }

  return (
    <LayoutOne size="small">
      <div className="mt-6" />
      <Card color="white">
        <div className="text-center mb-5">
          <StoreLogo/>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl label="Email" errorMessage={errors.email?.message}>
            <InputText
              placeholder="email"
              fitContainer
              {...register('email', rules.email)}
            />
          </FormControl>

          <FormControl label="Password" errorMessage={errors.password?.message}>
            <InputPassword
              placeholder="password"
              fitContainer
              {...register('password', rules.password)}
            />
          </FormControl>

          <Button fitContainer size="large" disabled={status === 'process'}>
            Login
          </Button>
        </form>
        
        <div className="text-center mt-2">
          Belum punya akun? <Link to="/register"><b>Daftar sekarang.</b></Link>
        </div>
      </Card>
    </LayoutOne>
  )
}
