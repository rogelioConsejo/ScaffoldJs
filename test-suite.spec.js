/* This is an example of how you can use the test-suite*/
import {expect, runTest, Test, TestSuite} from "./test-suite.js";

let testSuite = new TestSuite(
    new Test("valid test", someValidTest),
    new Test("failing test", someFailingTest),
    new Test("compare equal arrays", compareEqualArrays),
    new Test("compare different arrays", compareDifferentArrays),
    new Test("compare equal objects", compareEqualObjects),
    new Test("compare different objects", compareDifferentObjects),
    new Test("compare equal maps of objects", compareEqualMapsOfObjects),
    new Test("compare different maps of objects", compareDifferentMapsOfObjects),
);
testSuite.runTests();
runTest(new Test("valid test by itself", someValidTest))

function someValidTest() {
    return expect(1 + 1).toBe(2);
}

function someFailingTest() {
    return expect(1 + 1).toBe(3);
}

function compareEqualArrays() {
    let arr1 = [1, 2, 3]
    let arr2 = [1, 2, 3]
    return expect(arr1).toBe(arr2);
}

function compareDifferentArrays() {
    let arr1 = [1, 2, 4]
    let arr2 = [1, 2, 3]
    return expect(arr1).notToBe(arr2);
}

function compareEqualObjects() {
    let obj1 = {param1: true, param2: {someParam: 1}}
    let obj2 = {param1: true, param2: {someParam: 1}}
    return expect(obj1).toBe(obj2)
}

function compareDifferentObjects() {
    let obj1 = {param1: true, param2: {someParam: 1}}
    let obj2 = {param1: false}
    let obj3 = {param1: true, param2: true}
    let obj4 = {param1: true, param2: {someParam: 2}}

    return expect(obj1).notToBe(obj2) && expect(obj1).notToBe(obj3) && expect(obj1).notToBe(obj4)
}

function compareEqualMapsOfObjects() {
    let map1 = new Map()
    let map2 = new Map()
    map1.set("some-key", {param1: true, param2: {someParam: 1}})
    map2.set("some-key", {param1: true, param2: {someParam: 1}})

    return expect(map1).toBe(map2)
}

function compareDifferentMapsOfObjects() {
    let map1 = new Map()
    let map2 = new Map()
    map1.set("some-key", {param1: true, param2: {someParam: 1}})
    map2.set("some-key", {param1: true, param2: {someParam: 2}})

    return expect(map1).notToBe(map2)
}