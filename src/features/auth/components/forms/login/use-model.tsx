import toast from 'react-hot-toast';
import { LoginForm } from '../types';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../schemas';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/features/auth/apis/endpoints';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/utils/auth';

export function useLoginFormModel() {
  const navigate = useNavigate();

  const formMethods = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessTokenCookie({
        accessToken: data.accessToken,
        maxAge: data.accessTokenTtlMs,
      });
      setRefreshTokenCookie({
        refreshToken: data.refreshToken,
        maxAge: data.refreshTokenTtlMs,
      });
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { formMethods, loginMutation };
}
