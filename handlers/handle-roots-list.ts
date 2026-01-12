import { APP_CONFIG } from '../config/config';
import { readAllFiles } from '../utils/read-all-files';

const DATA_DIR = './data';

export async function handleRootsList() {
    const files = await readAllFiles(DATA_DIR);
    const roots = files.map((fileName) => ({
        uri: `${APP_CONFIG.SERVER_URL}/data/${fileName}`, // TODO: check how to add file protocol here?
        name: fileName.split('.')[0] ?? fileName,
    }));
    return { roots };
}
