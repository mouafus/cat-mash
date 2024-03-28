const apiURL = import.meta.env.VITE_API_URL

export const fetcher = (url: string) => fetch(`${apiURL}/${url}`).then(r => r.json())

export const postVote = (id: string) => fetch(`${apiURL}/${id}`, {method: 'POST'}).then(r => r.json());
