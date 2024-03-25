// @ts-ignore
import path from 'node:path';
// @ts-ignore
import Client from 'ssh2-sftp-client';
import "colorts/lib/string";

let RemoteClient = new Client();
RemoteClient.connect({
    host: "us.pylex.me",
    port: 2022,
    username: "774217476073848862.5d4c989b",
    password: "cht5IkIaWCvRV0LP3sbBpOSQ8"
}).then(async () => {
    const srcToDist = path.join(process.cwd(), 'dist');
    const srcToSrc = path.join(process.cwd(), 'src')

    await removeSrcOnRemote("/src");
    await removeDistOnRemote("/dist");

    await RemoteClient.uploadDir(srcToSrc, "/src").then(async () => {
        console.log(
            "Uploaded".green.bold,
            "/src/".blue.bold,
            "to remote server!".green.bold
        );

        await RemoteClient.uploadDir(srcToDist, "/dist").then(() => {
            console.log(
                "Uploaded".green.bold,
                "/dist/".blue.bold,
                "to remote server!".green.bold
            );
            process.exit();
        });
    });
});


async function removeSrcOnRemote(path: string) {
    await RemoteClient.rmdir(path, true).then(() => {
        console.log(
            "Deleted".red.bold,
            "/src/".blue.bold,
            "from remote server!".red.bold
        );
    });
}

async function removeDistOnRemote(path: string) {
    await RemoteClient.rmdir(path, true).then(() => {
        console.log(
            "Deleted".red.bold,
            "/dist/".blue.bold,
            "from remote server!".red.bold
        );
    });
}