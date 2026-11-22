require('dotenv').config();

const test = require('node:test');
const assert = require('node:assert/strict');
const { getLanguageById } = require('../src/utils/problemUtility');
const validate = require('../src/utils/validator');

test('getLanguageById supports cpp and rejects unsupported languages', () => {
  assert.equal(getLanguageById('cpp'), 54);
  assert.throws(() => getLanguageById('ruby'), /Unsupported language/);
});

test('validator accepts valid registration data', () => {
  assert.doesNotThrow(() => validate({
    firstName: 'Test',
    emailId: 'test@example.com',
    password: 'StrongPass1!'
  }));
});
