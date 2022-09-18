const { build: esbuild } = require('esbuild');

function build({ watch }) {
  return esbuild({
    entryPoints: ['./src/index'],
    bundle: true,
    outdir: './dist',
    watch: watch
  });
}

const args = process.argv.slice(2);

const hasWatchOption = args.some(arg => arg === '--watch');
const watch = hasWatchOption && {
  onRebuild(error, result) {
    console.log('\n\n\n\n\n\n');
    if (error) {
      return console.error(`Failed build cause: \n${error}`);
    }  

    console.log(`Build complete successfully`);
    console.log(`errors: \n${result.errors}`);
    console.log(`warnings: \n${result.warnings}`);

    console.log('---------------- \n\n\n')
    const paths = Object.keys(require.cache);
    const distPath = paths.find(path => /react-custom-renderer\/dist\/index.js$/.test(path));
    delete require.cache[distPath];

    require('./dist/index.js');
  }
};

build({ watch })
  .then(() => console.log('Done build'))
  .catch(() => process.exit(1));