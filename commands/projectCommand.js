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

import prompts from '../prompt/projectPrompt.js';
import Project from '../project/project.js';

/**
 * @param {String} name
 * @param config
 */
const newProject = (name, config = {}) => {
  // Check if game version is set.
  if (!config.game_version) {
    prompts.versionSelect
      .run()
      .then((game_version) => {
        if (!getProjectTemplate(game_version)) {
          console.warn(
            'Unsupported Version, you need to setup the Mdk manually!',
          );
        } else {
          newProject(null, { game_version: game_version });
        }
      })
      .catch(console.error);
    return;
  }

  // Check if project meta-data is set.
  if (!name) {
    prompts
      .projectForm(config)
      .run()
      .then((values) => {
        newProject(values.mod_name, { ...values });
      })
      .catch(console.error);
    return;
  }

  // Check if the project should be confirmed.
  if (!config.confirmed) {
    console.log(config);
    prompts.confirmProject
      .run()
      .then((confirmed) => {
        if (confirmed) {
          newProject(name, { ...config, confirmed: true });
        } else {
          console.warn('Project creation canceled!');
        }
      })
      .catch(console.error);
    return;
  }

  console.log('Processing ...', name, 'with', config);
  new Project(name, config).create();
};

/**
 * @param {string} version
 * @returns {string}
 */
const getProjectTemplate = (version) => {
  const prefix = 'mc-multi-loader-mdk-';
  switch (version) {
    case '1.18.2':
    case '1.19.2':
      return `${prefix}${version}`;
    default:
      return '';
  }
};

export default {
  newProject,
};
