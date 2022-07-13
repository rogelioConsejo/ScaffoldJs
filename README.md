# ScaffoldJs
A lean testing framework for JavaScript to be used as a module.

## Example use

```
import {expect, Test, TestSuite} from "./test-suite.js";

let testSuite = new TestSuite(
    new Test("valid test", someValidTest),
    new Test("failing test", someFailingTest)
);
testSuite.runTests();

function someValidTest(){
    return expect(1+1).toBe(2);
}

function someFailingTest(){
    return expect(1+1).toBe(3);
}
```
