const fs = require("fs");
const got = require("got");
const node_path = require("path");
const stream = require("stream");
const { promisify } = require("util");
const pkgDir = require("pkg-dir").sync();

const nodeModulesBin = node_path.join(pkgDir, "node_modules/.bin/");
const outPath = node_path.join(nodeModulesBin, "openapi-generator-cli");
if (!fs.existsSync(nodeModulesBin)) {
    fs.mkdirSync(nodeModulesBin);
}

const pipeline = promisify(stream.pipeline);

(async () => {
    await pipeline(
        got.stream(
            "https://raw.githubusercontent.com/OpenAPITools/openapi-generator/master/bin/utils/openapi-generator-cli.sh"
        ),
        fs.createWriteStream(outPath)
    );
})();
