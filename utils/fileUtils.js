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

import chalk from 'chalk';
import fs from 'fs-extra';

/**
 * @param {string} oldPath
 * @param {string} newPath
 * @param {boolean} overwrite
 */
const renameFolder = (oldPath, newPath, overwrite = false) => {
  if (!fs.existsSync(oldPath)) {
    console.error(chalk.red(`File ${oldPath} not found!`));
    return;
  }
  fs.copySync(oldPath, newPath, { overwrite: overwrite });
  if (fs.existsSync(newPath)) {
    fs.removeSync(oldPath);
  }
};

const removeFolder = (path) => {
  if (!fs.existsSync(path)) {
    return;
  }
  if (fs.readdirSync(path).length > 0) {
    console.warn(
      chalk.yellow(`Folder ${path} is not empty!`),
      fs.readdirSync(path),
    );
  }
  fs.removeSync(path);
};

const removeFolderIfEmpty = (path) => {
  if (!fs.existsSync(path) || fs.readdirSync(path).length > 0) {
    return;
  }
  fs.removeSync(path);
};

export default {
  renameFolder,
  removeFolder,
  removeFolderIfEmpty,
};
