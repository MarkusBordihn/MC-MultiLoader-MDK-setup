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
import normalizer from '../utils/normalizer.js';

describe('normalizer', () => {
  describe('normalizeClassName', () => {
    it('should convert spaces to camelCase', () => {
      strictEqual(normalizer.normalizeClassName('Example Mod'), 'ExampleMod');
    });

    it('should handle dashes and underscores', () => {
      strictEqual(normalizer.normalizeClassName('my-cool_mod'), 'Mycoolmod');
    });
  });

  describe('normalizeModId', () => {
    it('should convert spaces to underscores and lowercase', () => {
      strictEqual(normalizer.normalizeModId('Example Mod'), 'example_mod');
    });

    it('should handle mixed separators', () => {
      strictEqual(normalizer.normalizeModId('My-Cool Mod'), 'my_cool_mod');
    });
  });

  describe('normalizeClassNameSpace', () => {
    it('should remove spaces and lowercase', () => {
      strictEqual(normalizer.normalizeClassNameSpace('Example Name'), 'examplename');
    });
  });

  describe('normalizeVendorName', () => {
    it('should remove spaces and lowercase', () => {
      strictEqual(normalizer.normalizeVendorName('John Doe'), 'johndoe');
    });
  });

  describe('normalizeReproName', () => {
    it('should convert spaces to dashes', () => {
      strictEqual(normalizer.normalizeReproName('My Cool Mod'), 'My-Cool-Mod');
    });
  });

  describe('normalizeReproOwner', () => {
    it('should remove spaces', () => {
      strictEqual(normalizer.normalizeReproOwner('John Doe'), 'JohnDoe');
    });
  });
});
