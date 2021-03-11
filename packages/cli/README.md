@algotia/cli
============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@algotia/cli.svg)](https://npmjs.org/package/@algotia/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@algotia/cli.svg)](https://npmjs.org/package/@algotia/cli)
[![License](https://img.shields.io/npm/l/@algotia/cli.svg)](https://github.com/[object Object]/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @algotia/cli
$ algotia COMMAND
running command...
$ algotia (-v|--version|version)
@algotia/cli/1.0.0-alpha.0 linux-x64 node-v15.3.0
$ algotia --help [COMMAND]
USAGE
  $ algotia COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`algotia hello [FILE]`](#algotia-hello-file)
* [`algotia help [COMMAND]`](#algotia-help-command)

## `algotia hello [FILE]`

describe the command here

```
USAGE
  $ algotia hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ algotia hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Algotia/algotia/blob/v1.0.0-alpha.0/src/commands/hello.ts)_

## `algotia help [COMMAND]`

display help for algotia

```
USAGE
  $ algotia help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
