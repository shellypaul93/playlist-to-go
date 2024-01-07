const getRequest = async (
  path: string,
  type: 'GET' | 'POST' | 'PUT',
  body: any = null,
  token: string = '',
): Promise<Response> => {
  if (type === 'POST' || type === 'PUT') {
    return await fetch(path, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
  }
  return await fetch(path);
};

export default getRequest;
