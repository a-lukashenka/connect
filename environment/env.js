#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const currDir = path.dirname(fs.realpathSync(__filename));
const env = process.env.NODE_ENV;

const fileExists = filePath => {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
};

if (env) {
    const currEnv = path.join(currDir, `.env`);
    const envPath = path.join(currDir, `.env.${env}`);

    if (fileExists(currEnv)) {
        fs.unlinkSync(currEnv)
    }

    if (fileExists(envPath)) {
        fs.createReadStream(envPath).pipe(fs.createWriteStream(`.env`));
    }
}
