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

import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import Project from '../project/project.js';

describe('Project', () => {
  describe('shouldSkipFileForPlaceholderReplacement', () => {
    it('should skip .jar files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('test.jar'), true);
    });

    it('should skip .zip files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('test.zip'), true);
    });

    it('should skip .png files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('logo.png'), true);
    });

    it('should skip .gitignore files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('.gitignore'), true);
    });

    it('should skip .gitattributes files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('.gitattributes'), true);
    });

    it('should not skip .java files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('test.java'), false);
    });

    it('should not skip .gradle files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('build.gradle'), false);
    });

    it('should not skip .json files', () => {
      strictEqual(Project.shouldSkipFileForPlaceholderReplacement('config.json'), false);
    });
  });
});
