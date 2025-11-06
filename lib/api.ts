async function postJson(path: string, body: unknown) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get('content-type') || '';
  let data: unknown = null;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    throw new Error(message || res.statusText);
  }

  return data;
}

export async function login(username: string, password: string) {
  const BASE = 'http://localhost:8000';
  const url = `${BASE.replace(/\/$/, '')}/api/user/login`;
  return postJson(url, { username, password });
}

export async function signup(nombre: string, username: string, password: string) {
  const BASE = 'http://localhost:8000';
  const url = `${BASE.replace(/\/$/, '')}/api/user/signup`;
  return postJson(url, { nombre, username, password });
}
