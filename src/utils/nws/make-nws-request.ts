import { USER_AGENT } from '../../config';

export async function makeNWSRequest<T>(url: string): Promise<T | null> {
    const headers = {
        'User-Agent': USER_AGENT,
        Accept: 'application/geo+json',
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`http error: ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        console.error('error making nws request:', error);
        return null;
    }
}
