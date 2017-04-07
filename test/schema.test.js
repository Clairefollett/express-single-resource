const assert = require('assert');
const Schnoodle = require('../lib/models/schnoodles');

describe('schnoodle schema', () => {
    
    it('validates with all correct fields', () => {
        return new Schnoodle({
            name: 'testing',
            type: 'schnoodle',
            age: 8
        }).validate();
    });

    it('requires the name', () => {

    });

    it('requires the type', () => {
        
    });

    it('requires the age', () => {
        
    });
})