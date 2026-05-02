import { sanitizeInput } from '../utils/security';

describe('Input Sanitization', () => {
  test('should neutralize script tags', () => {
    const input = '<script>alert("xss")</script>';
    const output = sanitizeInput(input);
    expect(output).toBe('');
  });

  test('should escape potentially harmful characters', () => {
    const input = 'Hello; { "bad" }';
    const output = sanitizeInput(input);
    expect(output).toContain('&quot;bad&quot;');
  });

  test('should trim whitespace', () => {
    const input = '   Hello World   ';
    const output = sanitizeInput(input);
    expect(output).toBe('Hello World');
  });

  test('should return empty string for null or undefined', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
  });
});
