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

import fs from 'fs-extra';
import path from 'path';
import fileUtils from './../utils/fileUtils.js';
import { fileURLToPath } from 'url';
import cliProgress from 'cli-progress';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectTemplatePath = path.join(
  path.resolve(__dirname, '..'),
  'third_party',
);

class Project {
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }

  static getProjectPath(name = this.name, config = this.config) {
    return path.join(process.cwd(), name + '-' + config.game_version);
  }

  static getTemplatePath(config = this.config) {
    return path.join(
      projectTemplatePath,
      'mc-multi-loader-mdk-' + config.game_version,
    );
  }

  static getTemplatePlaceholder(name, config) {
    return {
      'Example Mod': config.mod_name,
      'https://example.org/examplemod': config.display_url,
      'https://example.org/issues': config.issue_tracker_url,
      'org.example.examplemod': config.class_namespace,
      __MOD_AUTHOR__: config.author,
      __MOD_DESCRIPTION__: config.description,
      __MOD_NAME__: config.mod_name,
      __MOD_VERSION__: config.mod_version,
      a__mod_id__: config.mod_id,
      example_mod: config.mod_id,
      ExampleMod: config.class_name,
      examplemod: config.class_package_name,
      johndoe: config.vendor_name,
    };
  }

  static getFilenamePlaceholder(name, config) {
    return {
      example_mod: config.mod_id,
      ExampleMod: config.class_name,
      examplemod: config.class_package_name,
    };
  }

  static renameClassNamespaceFolders(
    projectPath,
    folderName = 'Common',
    config = this.config,
  ) {
    const baseClassNamespacePath = path.join(
      projectPath,
      folderName,
      'src',
      'main',
      'java',
    );
    if (
      fs.existsSync(
        path.join(baseClassNamespacePath, 'org', 'example', 'examplemod'),
      )
    ) {
      console.log('✔️ Renaming', folderName, 'class namespace folder ...');
      fileUtils.renameFolder(
        path.join(baseClassNamespacePath, 'org', 'example', 'examplemod'),
        path.join(baseClassNamespacePath, ...config.class_namespace.split('.')),
      );
    } else {
      console.warn(
        '⏭️ Skipping renaming',
        folderName,
        'class namespace folder ...',
      );
    }
  }

  static renameResourcesFolders(
    projectPath,
    folderName = 'Common',
    resourceName = 'assets',
    config = this.config,
  ) {
    const baseResourcePath = path.join(
      projectPath,
      folderName,
      'src',
      'main',
      'resources',
    );
    const resourcePath = path.join(baseResourcePath, resourceName);
    if (fs.existsSync(path.join(resourcePath, 'example_mod'))) {
      console.log(
        '✔️ Renaming',
        folderName,
        'class resource folder',
        resourcePath,
        ' ...',
      );
      fileUtils.renameFolder(
        path.join(resourcePath, 'example_mod'),
        path.join(resourcePath, config.mod_id),
      );
    } else {
      console.warn(
        '⏭️ Skipping renaming',
        folderName,
        'class resource folder',
        resourcePath,
        ' ...',
      );
    }
  }

  create(name = this.name, config = this.config) {
    // Check if project folder already exists.
    const projectPath = Project.getProjectPath(name, config);
    if (fs.existsSync(projectPath)) {
      console.error('Project folder', projectPath, 'already exists!');
      return;
    }

    this.createProjectFolder(name, config);
    this.copyTemplate(name, config);
    this.cleanupTemplate(name, config);
    this.replaceTemplatePlaceholder(name, config);
    this.correctFileNames(name, config);
    this.showSuccessMessage(name, config);
  }

  createProjectFolder(name = this.name, config = this.config) {
    const projectPath = Project.getProjectPath(name, config);
    if (fs.existsSync(projectPath)) {
      console.error('Project folder', projectPath, 'already exists!');
      return;
    }

    console.log('Creating new project folder for', name);
    fs.mkdirSync(projectPath, { recursive: true });

    console.log('Store project configuration in', projectPath);
    fs.writeFileSync(
      path.join(projectPath, 'mc-multi-loader-mdk.project'),
      JSON.stringify(config, null, 2),
    );
  }

  copyTemplate(name = this.name, config = this.config) {
    const projectPath = Project.getProjectPath(name, config);
    const templatePath = Project.getTemplatePath(config);
    if (!fs.existsSync(templatePath)) {
      console.error('Template folder', templatePath, 'does not exists!');
      return;
    }

    const progressBar = new cliProgress.SingleBar(
      {
        format: '{bar} | {filename} | {value} %',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      },
      cliProgress.Presets.shades_classic,
    );

    // Copy project Template
    console.log(
      'Copying template folder files',
      templatePath,
      'to',
      projectPath,
    );
    progressBar.start(100, 0, { filename: 'Starting ...' });
    if (fs.copySync(templatePath, projectPath)) {
      console.error('Failed to copy template files!');
      return;
    } else {
      progressBar.update(100, { filename: 'Finished!' });
    }
    progressBar.stop();
  }

  cleanupTemplate(name, config) {
    const projectPath = Project.getProjectPath(name, config);

    // Copy logo from current path, if available
    const existingLogoPath = path.join(process.cwd(), 'logo.png');
    if (fs.existsSync(existingLogoPath)) {
      const logoPath = path.join(
        projectPath,
        'Common',
        'src',
        'main',
        'resources',
        'logo.png',
      );
      console.log('Copying existing logo', existingLogoPath, 'to', logoPath);
      fs.copyFileSync(existingLogoPath, logoPath);
    }

    // Rename class namespace folders.
    Project.renameClassNamespaceFolders(projectPath, 'Common', config);
    Project.renameClassNamespaceFolders(projectPath, 'Fabric', config);
    Project.renameClassNamespaceFolders(projectPath, 'Forge', config);
    Project.renameClassNamespaceFolders(projectPath, 'NeoForge', config);

    // Rename resource folders.
    Project.renameResourcesFolders(projectPath, 'Common', 'assets', config);
    Project.renameResourcesFolders(projectPath, 'Common', 'data', config);
    Project.renameResourcesFolders(projectPath, 'Fabric', 'assets', config);
    Project.renameResourcesFolders(projectPath, 'Fabric', 'data', config);
    Project.renameResourcesFolders(projectPath, 'Forge', 'assets', config);
    Project.renameResourcesFolders(projectPath, 'Forge', 'data', config);
    Project.renameResourcesFolders(projectPath, 'NeoForge', 'assets', config);
    Project.renameResourcesFolders(projectPath, 'NeoForge', 'data', config);

    // Remove unnecessary files.
    fs.removeSync(path.join(projectPath, '.git'));
    fs.removeSync(path.join(projectPath, 'README.md'));
    fs.removeSync(path.join(projectPath, 'LICENSE.md'));

    // Remove template resource fragments, if available.
    const templateResourcePath = path.join('src', 'main', 'java', 'org');
    fileUtils.removeFolder(
      path.join(projectPath, 'Common', templateResourcePath, 'example'),
    );
    fileUtils.removeFolderIfEmpty(
      path.join(projectPath, 'Common', templateResourcePath),
    );
    fileUtils.removeFolder(
      path.join(projectPath, 'Fabric', templateResourcePath, 'example'),
    );
    fileUtils.removeFolderIfEmpty(
      path.join(projectPath, 'Fabric', templateResourcePath),
    );
    fileUtils.removeFolder(
      path.join(projectPath, 'Forge', templateResourcePath, 'example'),
    );
    fileUtils.removeFolderIfEmpty(
      path.join(projectPath, 'Forge', templateResourcePath),
    );
    fileUtils.removeFolder(
      path.join(projectPath, 'NeoForge', templateResourcePath, 'example'),
    );
    fileUtils.removeFolderIfEmpty(
      path.join(projectPath, 'NeoForge', templateResourcePath),
    );
  }

  replaceTemplatePlaceholder(name = this.name, config = this.config) {
    const projectPath = Project.getProjectPath(name, config);
    if (!fs.existsSync(projectPath)) {
      console.error('Project folder', projectPath, 'does not exists!');
      return;
    }

    console.log('Replacing template placeholders in', projectPath);
    const templatePlaceholder = Project.getTemplatePlaceholder(name, config);
    const progressBar = new cliProgress.SingleBar(
      {
        format: '{bar} | {filename} | {value}/{total}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      },
      cliProgress.Presets.shades_classic,
    );

    // Get all relevant files.
    const files = fs
      .readdirSync(projectPath, { recursive: true })
      .filter((file) => {
        return fs
          .statSync(path.join(projectPath, file), { throwIfNoEntry: false })
          .isFile();
      });

    // Replace Template placeholder.
    progressBar.start(files.length, 0, { filename: 'Starting ...' });
    files.forEach((file) => {
      progressBar.increment(1, { filename: file });
      const filePath = path.join(projectPath, file);
      if (!fs.statSync(filePath).isFile()) {
        return;
      }
      let content = fs.readFileSync(filePath, 'utf8');
      for (const [key, value] of Object.entries(templatePlaceholder)) {
        content = content.replace(new RegExp(key, 'g'), value);
      }
      fs.writeFileSync(filePath, content, 'utf8');
    });
    progressBar.stop();
  }

  correctFileNames(name = this.name, config = this.config) {
    const projectPath = Project.getProjectPath(name, config);
    if (!fs.existsSync(projectPath)) {
      console.error('Project folder', projectPath, 'does not exists!');
      return;
    }

    console.log('Correcting filenames in', projectPath);
    const filenamePlaceholder = Project.getFilenamePlaceholder(name, config);
    const progressBar = new cliProgress.SingleBar(
      {
        format: '{bar} | {filename} | {value}/{total}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      },
      cliProgress.Presets.shades_classic,
    );

    // Get all files and folders.
    const files = fs
      .readdirSync(projectPath, { recursive: true })
      .filter((file) => {
        return fs
          .lstatSync(path.join(projectPath, file), {
            throwIfNoEntry: false,
          })
          .isFile();
      })
      .sort();

    // Replace template filename
    progressBar.start(files.length, 0, { filename: 'Starting ...' });
    files.forEach((file) => {
      progressBar.increment(1, { filename: file });
      const filePath = path.join(projectPath, file);
      if (!fs.statSync(filePath).isFile()) {
        return;
      }
      let newFile = file;
      for (const [key, value] of Object.entries(filenamePlaceholder)) {
        newFile = newFile.replace(new RegExp(key, 'g'), value);
      }
      if (file !== newFile) {
        fs.renameSync(filePath, path.join(projectPath, newFile));
      }
    });
    progressBar.stop();
  }

  showSuccessMessage(name = this.name, config = this.config) {
    console.log('Project', name, 'created successfully!');
    console.log(
      'Please open the project folder',
      Project.getProjectPath(name, config),
      'in IntelliJ IDEA.',
    );
  }
}

export default Project;
