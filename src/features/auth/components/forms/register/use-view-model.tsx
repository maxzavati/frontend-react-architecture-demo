import { RegisterForm } from '../types';
import { useRegisterFormModel } from './use-model';

export function useRegisterFormViewModel() {
  const model = useRegisterFormModel();

  const handleRegister = (data: RegisterForm) => {
    model.registerMutation.mutate(data);
  };

  return { model, handleRegister };
}
