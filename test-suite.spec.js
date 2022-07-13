/* This is a test and an example of how you can use the test-suite*/
import {expect, Test, TestSuite} from "./test-suite.js";

let testSuite = new TestSuite(
    new Test("valid test", someValidTest),
    new Test("failing test", someFailingTest),
    new Test("compare equal arrays", compareEqualArrays),
    new Test("compare different arrays", compareDifferentArrays),
    new Test("compare equal objects", compareEqualObjects),
    new Test("compare different objects", compareDifferentObjects),
);
testSuite.runTests();

function someValidTest(){
    return expect(1+1).toBe(2);
}

function someFailingTest(){
    return expect(1+1).toBe(3);
}

function compareEqualArrays(){
    let arr1 = [1,2,3]
    let arr2 = [1,2,3]
    return expect(arr1).toBe(arr2);
}

function compareDifferentArrays(){
    let arr1 = [1,2,4]
    let arr2 = [1,2,3]
    return expect(arr1).notToBe(arr2);
}

function compareEqualObjects(){
    let obj1 = {param1: true}
    let obj2 = {param1: true}
    return expect(obj1).toBe(obj2)
}

function compareDifferentObjects(){
    let obj1 = {param1: true}
    let obj2 = {param1: false}
    let obj3 = {param1: true, param2: true}

    return expect(obj1).notToBe(obj2) && expect(obj1).notToBe(obj3)
}
