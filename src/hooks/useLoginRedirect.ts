import { usePathname, useSearchParams } from 'next/navigation';

const REDIRECT_KEY = 'redirect';

// 自定义 hook：获取当前页面登录后重定向的路由地址
const useLoginRedirect = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get(REDIRECT_KEY);
  const pathname = usePathname();
  console.log('pathname', pathname);

  if (!redirect) {
    return '/';
  }
  if (redirect === pathname) {
    return '/';
  }
  return redirect;
};

export { useLoginRedirect };
