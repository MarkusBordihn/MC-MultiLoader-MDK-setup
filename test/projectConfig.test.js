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
import { ok, strictEqual, match } from 'node:assert';
import projectConfig from '../config/projectConfig.js';

describe('projectConfig', () => {
  describe('getDefault', () => {
    it('should return config object', () => {
      const config = projectConfig.getDefault();
      ok(config);
    });

    it('should have author set', () => {
      const config = projectConfig.getDefault();
      ok(config.author);
    });

    it('should have config_version 1.0.0', () => {
      const config = projectConfig.getDefault();
      strictEqual(config.config_version, '1.0.0');
    });

    it('should have class_name ExampleMod', () => {
      const config = projectConfig.getDefault();
      strictEqual(config.class_name, 'ExampleMod');
    });

    it('should have game_version 1.20.1', () => {
      const config = projectConfig.getDefault();
      strictEqual(config.game_version, '1.20.1');
    });

    it('should have license MIT', () => {
      const config = projectConfig.getDefault();
      strictEqual(config.license, 'MIT');
    });

    it('should have valid class_namespace pattern', () => {
      const config = projectConfig.getDefault();
      match(config.class_namespace, /^[a-z]+\.[a-z0-9_]+\.examplemod$/);
    });
  });
});
