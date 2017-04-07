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
                const errorMsg = 'Path `name` is required.';
                assert.equal(res.errors.name.message, errorMsg); 
            }
        );
    });

    it('requires the type', () => {
        return new Schnoodle({
            name: 'schnoodle',
            age: 50
        }).validate()
        .then(
            () => { throw new Error('validation should fail'); },
            res => {
                const errorMsg = 'Path `type` is required.';
                assert.equal(res.errors.type.message, errorMsg);  
            }
        );    
    });

    it('requires the age', () => {
        return new Schnoodle({
            name: 'breezy',
            type: 'doggy'
        }).validate()
        .then(
            () => { throw new Error('validation should fail'); },
            res => {
                const errorMsg = 'Path `age` is required.';
                assert.equal(res.errors.age.message, errorMsg) ; 
            }
        );      
    });

    it('fails validation if not the right type', () => {
        return new Schnoodle({
            name: 'testing123',
            type: 'doggy',
            age: 'hello'
        }).validate()
        .then(
            () => { throw new Error('validation should fail'); },
            res => {
                const errorMsg = 'Cast to Number failed for value "hello" at path "age"';
                assert.equal(res.errors.age.message, errorMsg);  
            }
        );
    });
});