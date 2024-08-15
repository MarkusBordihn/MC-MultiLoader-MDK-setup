/*
 * Copyright 2024 Markus Bordihn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { spawnSync } from 'child_process';
import LanguageUtils from '../utils/languageUtils.js';
import normalizer from '../utils/normalizer.js';

const configVersion = '1.0.0';
const possibleNamespacePrefix =
  LanguageUtils.getLanguage().substring(0, 2).toLocaleLowerCase() || 'net';

function getGitAuthor() {
  try {
    return (
      spawnSync('git', ['config', 'user.name'], {
        shell: true,
      })
        .stdout.toString()
        .split('\n')[0]
        .trim() || ''
    );
  } catch (error) {
    return '';
  }
}

function getAuthor() {
  return (
    getGitAuthor() ||
    process.env.USER ||
    os.userInfo().username ||
    'Author Name'
  );
}

function getClassNamespace() {
  return (
    process.env.npm_package_config_project_namespace ||
    `${possibleNamespacePrefix}.${normalizer.normalizeModId(
      getAuthor(),
    )}.examplemod` ||
    'org.example.examplemod'
  );
}

function getDefault() {
  return {
    config_version: configVersion,
    author: getAuthor(),
    class_name: 'ExampleMod',
    class_namespace: getClassNamespace(),
    class_package_name: 'examplemod',
    description: 'Description for Example Mod ...',
    display_url: 'https://example.org/examplemod',
    game_version: '1.18.2',
    issue_tracker_url: 'https://example.org/issues',
    license: 'MIT',
    vendor_name: 'johndoe',
  };
}

export default {
  getDefault,
};
