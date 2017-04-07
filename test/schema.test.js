const chai = require('chai');
const assert = chai.assert;
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
        return new Schnoodle({
            type: 'schnoodle',
            age: 9
        }).validate()
        .then(
            () => { throw new Error('validation should fail'); },
            res => {
                const errorMsg = 'Path `name` is required.'
                assert.equal(res.errors.name.message, errorMsg)  
            }
        )
    });

    it('requires the type', () => {
        
    });

    it('requires the age', () => {
        
    });
})