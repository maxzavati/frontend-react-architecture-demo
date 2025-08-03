import s from './styles.module.css';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input/input';
import { useLoginFormViewModel } from './use-view-model';
import { CTAButton } from '@/components/ui/cta-button/cta-button';

export function LoginFormView() {
  const { model, handleLogin } = useLoginFormViewModel();
  const { formMethods, loginMutation } = model;
  const { control, formState, handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={s.root}>
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
      <CTAButton type='submit' width='100%' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Processing...' : 'Sing In'}
      </CTAButton>
      {loginMutation.error?.message ? (
        <p className={s.error}>{loginMutation.error.message}</p>
      ) : null}
    </form>
  );
}
