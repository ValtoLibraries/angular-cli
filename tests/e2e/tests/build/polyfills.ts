import { expectFileToMatch } from '../../utils/fs';
import { ng } from '../../utils/process';
import { oneLineTrim } from 'common-tags';

export default function () {
  return Promise.resolve()
    .then(() => ng('build'))
    // files were created successfully
    .then(() => expectFileToMatch('dist/polyfills.js', 'core-js'))
    .then(() => expectFileToMatch('dist/polyfills.js', 'zone.js'))
    // index.html lists the right bundles
    .then(() => expectFileToMatch('dist/index.html', oneLineTrim`
      <script type="text/javascript" src="runtime.js"></script>
      <script type="text/javascript" src="polyfills.js"></script>
    `));
}
