import { type PermissionResolvable, type PermissionsString, PermissionsBitField, type APIEmbed, type Message } from 'discord.js';
import { pathToFileURL } from 'node:url';
import { type PathLike, readdirSync } from 'node:fs';
import { join } from 'node:path';
import fs from "node:fs";
import * as mysql from "mysql";
// import { BotOwner } from '../config.js';
// @ts-ignore
import path from 'node:path';
// @ts-ignore
import Client from 'ssh2-sftp-client';
import "colorts/lib/string.js";

/**
 * This function gets the default export from a file.
 * @param {string} path - The path to the file
*/
export async function dynamicImport(path: string): Promise<any> {
    const module = await import(pathToFileURL(path).toString());
    return module?.default;
};

/**
 * Loads all the structures from the provided directory path.
 * @param {PathLike} path - The directory path to load the structures from
 * @param {[string, string]} props - The properties to check if the structure is valid
 */
export async function loadStructures(path: PathLike, props: [string, string]) {
    const fileData = [];

    const folders = readdirSync(path);

    for (const folder of folders) {
        const filesPath = join(path.toString(), folder);
        const files = readdirSync(filesPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const filePath = join(filesPath, file);
            const data = await dynamicImport(filePath);

            if (props[0] in data && props[1] in data) fileData.push(data);
            else console.warn(`\u001b[33m The command at ${filePath} is missing a required ${props[0]} or ${props[1]} property.`);
        }
    }

    return fileData;
}

/** 
 * Shows the missing permissions.
 * @param {PermissionResolvable} memberPerms - The member's permissions
 * @param {PermissionResolvable} requiredPerms - The required permissions
*/
export function missingPerms(memberPerms: PermissionResolvable, requiredPerms: PermissionResolvable): PermissionsString[] {
    return new PermissionsBitField(memberPerms).missing(new PermissionsBitField(requiredPerms));
};

/**
 * This function shortens a string.
 * @param {string} text - The text to be shortened
 * @param {number} total - The total length of the text
 */
export function ellipsis(text: string, total: number): string {
    if (text.length <= total) {
        return text;
    }
    const keep = total - 3;
    if (keep < 1) return text.slice(0, total);
    return `${text.slice(0, keep)}...`;
};

export function truncateEmbed(embed: APIEmbed): APIEmbed {
    return {
        ...embed,
        description: embed.description ? ellipsis(embed.description, 4096) : undefined,
        title: embed.title ? ellipsis(embed.title, 256) : undefined,
        author: embed.author
            ? {
                ...embed.author,
                name: ellipsis(embed.author.name, 256),
            }
            : undefined,
        footer: embed.footer
            ? {
                ...embed.footer,
                text: ellipsis(embed.footer.text, 2048),
            }
            : undefined,
        fields: embed.fields
            ? embed.fields
                .map((field) => ({
                    ...field,
                    name: ellipsis(field.name, 256),
                    value: ellipsis(field.value, 1024),
                }))
                .slice(0, 25)
            : [],
    } as const;
};

export function formatMessageToEmbed(message: Message<true>) {
    const { author, attachments, content, createdAt } = message

    let embed = truncateEmbed({
        author: {
            name: `${author.discriminator === '0' ? author.username : author.tag} (${author.id})`,
            icon_url: author.displayAvatarURL(),
        },
        description: content.length
            ? content
            : '<No message content>',
        timestamp: createdAt.toISOString(),
        color: 0x2f3136,
    });

    const attachment = attachments.first();
    const attachmentIsImage = ["image/jpeg", "image/png", "image/gif"].includes(attachment?.contentType ?? "");
    const attachmentIsImageNaive = [".jpg", ".png", ".gif"].some((ext) => attachment?.name?.endsWith(ext));

    if (attachment && (attachmentIsImage || attachmentIsImageNaive)) {
        embed = {
            ...embed,
            image: {
                url: attachment.url,
            },
        };
    };

    return embed;
};

export function* readAllFiles(dir: string): Generator<string> {
    const files = fs.readdirSync(dir, { withFileTypes: true });
  
    for (const file of files) {
        if (file.isDirectory()) {
            yield* readAllFiles(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        };
    };
};

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function createSQLConnection() {
    mysql.createConnection({
        host: "sql11.freemysqlhosting.net",
        user: "sql11685896",
        password: "WJrSHCPApC",
        database: "sql11685896",
        port: 3306
    })
}

export const connection = mysql.createConnection({
    host: "sql11.freemysqlhosting.net",
    user: "sql11685896",
    password: "WJrSHCPApC",
    database: "sql11685896",
    port: 3306
})

/*
import express from "express";
export function startServer() {
    const app = express();
    app.use(express.text());
    const port = 7096;

    app.get('/', (_req, res) => {
        res.send('Hello World!')
    })
    app.post('/', (_req, res) => {
        res.send('Got a POST request')
        console.log("Got a POST request")
    })

    app.get('/version', (_req, res) => {
        res.send("Current version is v3.0.0")
    })
    app.post('/version', (req, res) => {
        console.log('Got body:', req.body);
        res.send("Current version is v3.0.0")
    });

    app.get('/search', (req, res) => {
        res.send('You searched for: ' + req.query.keyword)
    })

    app.listen(port, "0.0.0.0", () => {
        console.log(`Example app listening on port ${port}`)
    })
}
*/
/* 
export async function hasPermission(guild, user, permission) {
    // Check if user is guild owner
    if(guild.ownerId === user.id) {
        return true;
    };

    const CustomUserPermissions = await CustomPermissions.findOne({
        GuildID: guild.id,
        UserID: user.id,
    }).lean().exec();

    if (!CustomUserPermissions) {
        return false;
    }

    CustomUserPermissions.UserPermissions = CustomUserPermissions.UserPermissions || [];

    if (!CustomUserPermissions.UserPermissions) {
        return false;
    }

    if (user.id === BotOwner.userId && BotOwner.permission === 'REVVER.ALL') {
        return true; // Bot owner always has the REVVER.OWNER permission
    }

    if(user.id === guild.ownerId)

    return CustomUserPermissions.UserPermissions.includes(permission);
};
*/
let RemoteClient = new Client();
export async function uploadDistToRemote() {
    
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
            });
        });
    });
}

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