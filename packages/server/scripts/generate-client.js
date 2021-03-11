const execa = require("execa");
const path = require("path");
const fs = require("fs");

const serverRoot = path.resolve(__dirname, "../");
const clientRoot = path.resolve(serverRoot, "../client/");
const clientSrcPath = path.join(clientRoot, "src/");

(async () => {
    await execa.command(
        `openapi-generator-cli generate -i ./spec/swagger.json -o ${clientSrcPath} -g typescript-axios`, //prettier-ignore
        {
            cwd: serverRoot,
        }
    );

    fs.rmSync(path.join(clientSrcPath, "git_push.sh"));

    fs.copyFileSync(
        path.join(serverRoot, "spec/swagger.json"),
        path.join(clientRoot, "swagger.json")
    );
})();
