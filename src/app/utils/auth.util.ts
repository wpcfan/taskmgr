export const getAuth = (): boolean => {
  if (typeof window !== 'undefined') {
    const access_token = localStorage.getItem('access_token');
    return access_token !== undefined && access_token !== null;
  }
  return false;
}
