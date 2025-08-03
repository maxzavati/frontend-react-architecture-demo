import { LoginForm } from '../types';
import { useLoginFormModel } from './use-model';

export function useLoginFormViewModel() {
  const model = useLoginFormModel();

  const handleLogin = (data: LoginForm) => {
    model.loginMutation.mutate(data);
  };

  return { model, handleLogin };
}
