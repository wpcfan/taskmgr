export const getAuth = (): boolean => {
  const access_token = localStorage.getItem('access_token');
  return access_token !== undefined && access_token !== null;
}
