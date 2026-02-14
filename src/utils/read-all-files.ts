export async function readAllFiles(
    dir: string,
    options: { pattern: string; onlyFiles: boolean } = {
        pattern: '**/*',
        onlyFiles: true,
    },
): Promise<string[]> {
    const { pattern, onlyFiles } = options;

    const glob = new Bun.Glob(pattern);
    const files: string[] = [];

    for await (const file of glob.scan({ cwd: dir, onlyFiles })) {
        files.push(file);
    }

    return files;
}
