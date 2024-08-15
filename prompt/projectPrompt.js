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

import enquirer from 'enquirer';
import LanguageUtils from '../utils/languageUtils.js';
import projectConfig from '../config/projectConfig.js';
import normalizer from '../utils/normalizer.js';

const { Confirm, Form, Select } = enquirer;

const detectedLanguage = LanguageUtils.getLanguage();
const possibleNamespacePrefix =
  detectedLanguage.substring(0, 2).toLocaleLowerCase() || 'net';

const defaultProjectConfig = projectConfig.getDefault();
const projectForm = function (projectConfig) {
  return new Form({
    name: 'project',
    message: 'Please provide the following information for the project:',
    choices: [
      {
        name: 'config_version',
        message: 'Config Version',
        initial: defaultProjectConfig.config_version,
        hidden: true,
      },
      {
        name: 'game_version',
        message: 'Game version',
        initial:
          projectConfig.game_version || defaultProjectConfig.game_version,
        hidden: true,
      },
      {
        name: 'author',
        message: 'Author Name',
        initial: defaultProjectConfig.author || 'Author',
        validate(value) {
          return value != null && value.trim().length;
        },
        result(value) {
          return value.trim();
        },
      },
      {
        name: 'mod_name',
        message: 'Mod Name',
        initial: defaultProjectConfig.name || 'New Project',
        validate(value) {
          return value != null && value.trim().length;
        },
        result(value) {
          return value.trim();
        },
      },
      {
        name: 'mod_id',
        message: 'Mod Id',
        initial: defaultProjectConfig.config?.id || '',
        onChoice(state, choice) {
          const { mod_name } = this.values;
          choice.initial = `${normalizer.normalizeModId(mod_name)}`;
        },
        validate(value) {
          return (
            value != null &&
            value.trim().length &&
            value === normalizer.normalizeModId(value)
          );
        },
        result(value) {
          return normalizer.normalizeModId(value);
        },
      },
      {
        name: 'license',
        message: 'License',
        initial: defaultProjectConfig.license || 'MIT',
        validate(value) {
          return value != null && value.trim().length;
        },
        result(value) {
          return value.trim();
        },
      },
      {
        name: 'description',
        message: 'description',
        initial: defaultProjectConfig.description || 'A new Minecraft Mod',
        validate(value) {
          return value != null && value.trim().length;
        },
        result(value) {
          return value.trim();
        },
      },
      {
        name: 'class_name',
        message: 'Class Name',
        initial: defaultProjectConfig.class_name || 'ExampleMod',
        onChoice(state, choice) {
          const { mod_name } = this.values;
          choice.initial = `${normalizer.normalizeClassName(mod_name)}`;
        },
        validate(value) {
          return (
            value != null &&
            value.trim().length &&
            value === normalizer.normalizeClassName(value)
          );
        },
        result(value) {
          return normalizer.normalizeClassName(value);
        },
      },
      {
        name: 'class_namespace',
        message: 'Class Namespace',
        initial: defaultProjectConfig.class_namespace,
        onChoice(state, choice) {
          const { author, mod_id } = this.values;
          choice.initial = `${normalizer.normalizeClassNameSpace(
            possibleNamespacePrefix,
          )}.${normalizer.normalizeClassNameSpace(
            author,
          )}.${normalizer.normalizeClassNameSpace(mod_id || 'new_project')}`;
        },
      },
      {
        name: 'class_package_name',
        message: 'Class Package Name',
        initial: defaultProjectConfig.namespace,
        onChoice(state, choice) {
          const { class_namespace } = this.values;
          choice.initial = class_namespace
            ? class_namespace.split('.').pop()
            : 'examplemod';
        },
      },
      {
        name: 'vendor_name',
        message: 'Vendor Name',
        initial: defaultProjectConfig.vendor_name,
        onChoice(state, choice) {
          const { author } = this.values;
          choice.initial = `${normalizer.normalizeVendorName(author)}`;
        },
        validate(value) {
          return (
            value != null &&
            value.trim().length &&
            value === normalizer.normalizeVendorName(value)
          );
        },
        result(value) {
          return normalizer.normalizeVendorName(value);
        },
      },
      {
        name: 'display_url',
        message: 'Display URL',
        initial: defaultProjectConfig.display_url,
        onChoice(state, choice) {
          const { mod_id, mod_name } = this.values;
          choice.initial = `https://curseforge.com/minecraft/mc-mods/${
            mod_id || mod_name
          }`;
        },
      },
      {
        name: 'issue_tracker_url',
        message: 'Issue Tracker URL',
        initial: defaultProjectConfig.issue_tracker_url,
        onChoice(state, choice) {
          const { author, mod_name } = this.values;
          choice.initial = `https://github.com/${normalizer.normalizeReproOwner(
            author,
          )}/${normalizer.normalizeReproName(mod_name)}/issues`;
        },
      },
    ],
  });
};

const confirmProject = new Confirm({
  name: 'confirmProject',
  message: 'Do you want to create the project with the following settings?',
});

const versionSelect = new Select({
  name: 'minecraftVersion',
  message: 'Please select the Minecraft version for your project',
  choices: [
    //{
    //  message: '1.16.5',
    //  value: '1.16.5',
    //},
    {
      message: '1.18.2',
      value: '1.18.2',
    },
    //{
    //  message: '1.19.2',
    //  value: '1.19.2',
    //},
    //{
    //  message: '1.20.1',
    //  value: '1.20.1',
    //},
    //{
    //  message: '1.21.1',
    //  value: '1.21.1',
    //},
  ],
});

export default {
  confirmProject,
  projectForm,
  versionSelect,
};
