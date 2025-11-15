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

import { describe, it, before, after } from 'node:test';
import { ok, strictEqual } from 'node:assert';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import Project from '../project/project.js';

describe('Project Integration', () => {
  const tempDir = path.join(os.tmpdir(), 'mc-mdk-test-' + Date.now());
  const projectName = 'TestMod';
  const testConfig = {
    game_version: '1.21.1',
    mod_name: 'Test Mod',
    mod_id: 'test_mod',
    author: 'Test Author',
    description: 'Test Description',
    class_name: 'TestMod',
    class_namespace: 'com.test.testmod',
    class_package_name: 'testmod',
    vendor_name: 'testauthor',
    display_url: 'https://example.com/test',
    issue_tracker_url: 'https://example.com/issues',
    license: 'MIT',
    mod_version: '1.0.0',
    confirmed: true,
  };

  let originalCwd;

  before(() => {
    originalCwd = process.cwd();
    fs.ensureDirSync(tempDir);
    process.chdir(tempDir);
  });

  after(() => {
    process.chdir(originalCwd);
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
    }
  });

  it('should create a complete project structure', () => {
    const project = new Project(projectName, testConfig);
    project.create();

    const projectPath = Project.getProjectPath(projectName, testConfig);
    ok(fs.existsSync(projectPath), 'Project folder should exist');

    ok(
      fs.existsSync(path.join(projectPath, 'gradle.properties')),
      'gradle.properties should exist',
    );
    ok(fs.existsSync(path.join(projectPath, 'build.gradle')), 'build.gradle should exist');
    ok(fs.existsSync(path.join(projectPath, 'settings.gradle')), 'settings.gradle should exist');

    ok(fs.existsSync(path.join(projectPath, 'Common')), 'Common folder should exist');
    ok(fs.existsSync(path.join(projectPath, 'Fabric')), 'Fabric folder should exist');
    ok(fs.existsSync(path.join(projectPath, 'Forge')), 'Forge folder should exist');
    ok(fs.existsSync(path.join(projectPath, 'NeoForge')), 'NeoForge folder should exist');

    const configFile = path.join(projectPath, 'mc-multi-loader-mdk.project');
    ok(fs.existsSync(configFile), 'Config file should exist');

    const savedConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    strictEqual(savedConfig.mod_name, testConfig.mod_name);
    strictEqual(savedConfig.mod_id, testConfig.mod_id);
    strictEqual(savedConfig.game_version, testConfig.game_version);

    ok(!fs.existsSync(path.join(projectPath, 'README.md')), 'README.md should be removed');
    ok(!fs.existsSync(path.join(projectPath, 'LICENSE.md')), 'LICENSE.md should be removed');
    ok(!fs.existsSync(path.join(projectPath, '.git')), '.git folder should be removed');
  });

  it('should preserve binary files', () => {
    const projectPath = Project.getProjectPath(projectName, testConfig);
    const jarFile = path.join(projectPath, 'gradle', 'wrapper', 'gradle-wrapper.jar');

    ok(fs.existsSync(jarFile), 'gradle-wrapper.jar should exist');

    const stats = fs.statSync(jarFile);
    ok(stats.size > 0, 'gradle-wrapper.jar should not be empty');
  });

  it('should replace placeholders in text files', () => {
    const projectPath = Project.getProjectPath(projectName, testConfig);
    const gradleProps = fs.readFileSync(path.join(projectPath, 'gradle.properties'), 'utf8');

    ok(!gradleProps.includes('example_mod'), 'Should not contain example_mod');
    ok(!gradleProps.includes('examplemod'), 'Should not contain examplemod');
    ok(gradleProps.includes(testConfig.mod_id), 'Should contain test_mod');
  });

  it('should not modify .gitignore', () => {
    const projectPath = Project.getProjectPath(projectName, testConfig);
    const gitignore = fs.readFileSync(path.join(projectPath, '.gitignore'), 'utf8');

    ok(gitignore.includes('build'), '.gitignore should contain build');
    ok(gitignore.includes('.gradle'), '.gitignore should contain .gradle');
    ok(!gitignore.includes(testConfig.mod_id), '.gitignore should not have placeholders replaced');
  });
});
