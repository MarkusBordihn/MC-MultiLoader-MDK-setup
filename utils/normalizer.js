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

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeClassName = (name = '') => {
  return name
    .trim()
    .replace(/(^\w|\s\w)/g, (firstChar) => firstChar.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeClassNameSpace = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeFileName = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(':', '__')
    .replace(/[^a-zA-Z0-9_.-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeModId = (name = '') => {
  return name
    .trim()
    .replace(/[\s-]+/g, '_')
    .replace(/\W/g, '')
    .toLowerCase();
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeName = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeReproName = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeReproOwner = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};

/**
 * @param {string} name
 * @param {string} namespace
 * @returns {string}
 */
const normalizeItemId = (name = '', namespace = 'my_items') => {
  return `${normalizeName(namespace)}:${normalizeName(name)}`;
};

/**
 * @param {string} name
 * @param {string} namespace
 * @returns {string}
 */
const normalizeBlockId = normalizeItemId;

/**
 * @param {string} name
 * @returns {string}
 */
const normalizePathName = (name = '') => {
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};

/**
 * @param {string} name
 * @returns {string}
 */
const normalizeVendorName = (name = '') => {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
};

export default {
  normalizeBlockId,
  normalizeClassName,
  normalizeClassNameSpace,
  normalizeFileName,
  normalizeItemId,
  normalizeModId,
  normalizeName,
  normalizePathName,
  normalizeReproName,
  normalizeReproOwner,
  normalizeVendorName,
};
