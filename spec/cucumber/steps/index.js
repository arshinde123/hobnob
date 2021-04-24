const superagent = require('superagent');
const { AssertionError } = require('assert');
const assert = require('assert');
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60 * 100);

When('the client creates a POST request to \\/users', function (callback) {
    this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/users`);
    callback();
});

When('attaches a generic empty payload', function (callback) {
    callback ();
    return undefined;
});

When('sends the request', function (callback) {
    this.request
        .then((response) => {
            this.response = response.res;
            callback();
        })
        .catch((errResponse) => {
            this.response = errResponse.response;
            callback();
        });
});

Then('API should respond with a 400 HTTP status code', function (callback) {
    assert.strictEqual(this.response.statusCode, 400);
    callback();
});

Then('the payload of the response should be a JSON object', function (callback) {
    // Check Content-Type header
    const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type']
    if (!contentType || !contentType.includes('application/json')) {
        throw new AssertionError({
            expected: 'application/json',
            actual: contentType,
            operator: 'expected to be'
        });
    }

    // Check it is valid json
    try {
        this.responsePayload = JSON.parse(this.response.text);
    } catch(e) {
        throw new AssertionError({
            expected: 'Valid JSON response',
            actual: 'Invalid or not a JSON response',
            operator: 'expected to be'
        });
    }

    callback();
});

Then('contains a message property which says "Payload should not be empty"', function (callback) {
    assert.strictEqual(this.responsePayload.message, "Payload should not be empty");
    // if (this.responsePayload.message !== "Payload should not be empty") {
    //     throw new Error('Incorrect error message');
    // }
    callback();
});