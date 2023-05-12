const { Command } = require('commander');
const client = require('./client');

const program = new Command()

program
    .version('1.0.0')
    .description('Terminal Chat App');

// start chat command
program
    .command('chat')
    .action(() => {
        process.stdin.on('data', (data) => {
            const message = data.toString().trim();
            client.emit('chat message', message);
          });
    });

program.parse(process.argv)
