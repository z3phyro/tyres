export const ok = (body?: object) =>
  new Response(body ? JSON.stringify(body) : "{}", { status: 200 });
