import s from './styles.module.css';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input/input';
import { useRegisterFormViewModel } from './use-view-model';
import { CTAButton } from '@/components/ui/cta-button/cta-button';

export function RegisterFormView() {
  const { model, handleRegister } = useRegisterFormViewModel();
  const { formMethods, registerMutation } = model;
  const { control, formState, handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(handleRegister)} className={s.root}>
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
      <CTAButton
        type='submit'
        width='100%'
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Processing...' : 'Sign Up'}
      </CTAButton>
      {registerMutation.error?.message ? (
        <p className={s.error}>{registerMutation.error.message}</p>
      ) : null}
    </form>
  );
}
