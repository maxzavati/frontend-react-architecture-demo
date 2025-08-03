import toast from 'react-hot-toast';
import { RegisterForm } from '../types';
import { useForm } from 'react-hook-form';
import { registerFormSchema } from '../schemas';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '@/features/auth/apis/endpoints';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/utils/auth';

export function useRegisterFormModel() {
  const navigate = useNavigate();

  const formMethods = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
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

  return { formMethods, registerMutation };
}
