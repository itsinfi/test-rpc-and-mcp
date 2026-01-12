import { APP_CONFIG } from '../config/config';

export function getDockerUrl(url: string): string {
    if (APP_CONFIG.ENV === 'DOCKER') {
        return url.replace('localhost', 'host.docker.internal');
    }

    return url;
}
