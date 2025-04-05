export const createAuthFetch =
  (apiUrl: string, getToken: () => Promise<string>) =>
  async <R>(endpoint: string, options?: RequestInit) => {
    const accessToken = await getToken();
    const headers = new Headers(options?.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);
    const response = await fetch(apiUrl + endpoint, { ...options, headers });
    if (!response.ok) throw Error(response.statusText);
    return (await response.json()) as Promise<R>;
  };
