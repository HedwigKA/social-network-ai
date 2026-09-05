/**
 * Unit Test Suite for Storage and Gemini API Services.
 */
import { storageService } from '../js/services/storageService.js';
import { isValidApiKey } from '../js/utils/validators.js';

export function runServiceTests() {
    const results = [];

    // Test 1: Storage Service defaults
    try {
        const model = storageService.getModel();
        if (model && typeof model === 'string') {
            results.push({ name: 'Storage Service Model Retrieval', status: 'PASS' });
        } else {
            results.push({ name: 'Storage Service Model Retrieval', status: 'FAIL', error: 'Invalid model returned' });
        }
    } catch (e) {
        results.push({ name: 'Storage Service Model Retrieval', status: 'FAIL', error: e.message });
    }

    // Test 2: API Key Validator
    try {
        const validKey = 'AIzaSy123456789012345';
        const invalidKey = 'short';
        if (isValidApiKey(validKey) && !isValidApiKey(invalidKey)) {
            results.push({ name: 'API Key Validator Format Test', status: 'PASS' });
        } else {
            results.push({ name: 'API Key Validator Format Test', status: 'FAIL', error: 'Validation check failed' });
        }
    } catch (e) {
        results.push({ name: 'API Key Validator Format Test', status: 'FAIL', error: e.message });
    }

    return results;
}

if (typeof window !== 'undefined') {
    window.runServiceTests = runServiceTests;
}
