import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { z } from 'zod';

import s from './styles.module.css';
import { register } from '@/apis/auth';
import { registerFormSchema } from '../../schemas';
import { Input } from '@/components/ui/input/input';
import { CTAButton } from '@/components/ui/cta-button/cta-button';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/utils/auth';

type Form = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm<Form>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const submitMutation = useMutation({
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

  const onSubmit = (data: Form) => {
    submitMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='First name'
            placeholder='Enter first name'
            value={field.value}
            onChange={field.onChange}
            helperText={formState.errors.firstName?.message}
          />
        )}
      />
      <Controller
        name='lastName'
        control={control}
        render={({ field }) => (
          <Input
            type='text'
            label='Last name'
            placeholder='Enter last name'
            value={field.value}
            onChange={field.onChange}
            helperText={formState.errors.lastName?.message}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <Input
            type='email'
            label='Email'
            placeholder='Enter email'
            value={field.value}
            onChange={field.onChange}
            helperText={formState.errors.email?.message}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <Input
            type='password'
            label='Password'
            placeholder='Enter password'
            value={field.value}
            onChange={field.onChange}
            helperText={formState.errors.password?.message}
          />
        )}
      />
      <CTAButton type='submit' width='100%' disabled={submitMutation.isPending}>
        {submitMutation.isPending ? 'Processing...' : 'Sing In'}
      </CTAButton>
      {submitMutation.error?.message ? (
        <p className={s.error}>{submitMutation.error.message}</p>
      ) : null}
    </form>
  );
}
