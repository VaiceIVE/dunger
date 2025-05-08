import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginButton = ({
  children,
  authView = 'login'
}: {
  children?: ReactNode;
  authView?: 'login' | 'register';
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const openModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('auth', authView);
    void navigate(`?${newParams.toString()}`, { replace: false, preventScrollReset: true });
  };

  return <div onClick={openModal}>{children}</div>;
};
