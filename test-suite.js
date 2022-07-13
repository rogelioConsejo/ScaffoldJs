"use strict"

/** A TestSuite is a Suite of objects of class Test, to be executed together */
class TestSuite {
    tests = [];

    /** You can build your suite with the tests already in it, instead of adding them later
     * @param {...Test} tests*/
    constructor(...tests) {
        this.tests = tests;
    }

    /** @param {Test} test */
    addTest(test) {
        this.tests.push(test);
    }

    runTests() {
        this.tests.forEach(test => runTest(test));

        function runTest(test) {
            let passed = test.func();
            let testName = test.name;
            if (passed) {
                console.log(testName + " - PASS");
            } else {
                console.log(testName + " - FAIL");
            }
        }
    }

}

/** A Test needs to have a name and a testFunction */
class Test {
    name = "";
    func = function () {
    };

    /**
     * @callback testFunction
     * @return boolean
     */
    /** @param {string} name the test name
     * @param {testFunction} testFunction the test function to be called, should return true on passing the test and
     * false on failing it
     * */
    constructor(name, testFunction) {
        this.name = name;
        this.func = testFunction;
    }
}

/** This is just to make tests a bit more readable
 * @param {any} something the first thing to be compared
 * @return {{toBe: toBe}} expectation
 *  */
function expect(something) {
    return {
        /**@callback toBe
         * @param {any} somethingElse
         * @returns boolean*/
        toBe: function (somethingElse) {
            let haveSameTypes = checkForSameType(something, somethingElse);
            if (!haveSameTypes) {
                return false;
            }

            let areObjects = checkIfBothAreOfObjectType(something, somethingElse);
            if (areObjects) {
                return checkIfObjectsAreEqual(something, somethingElse);
            }
            return something === somethingElse;

            /*** @returns {boolean} */
            function checkIfObjectsAreEqual(obj1, obj2) {
                if (obj1.keys.length !== obj2.keys.length) {
                    return false;
                }
                for (const key in obj1) {
                    if (obj1[key] !== obj2[key]) {
                        return false;
                    }
                }

                return true;
            }

            /*** @returns {boolean} */
            function checkForSameType(obj1, obj2) {
                return typeof obj1 === typeof obj2;
            }

            /*** @returns {boolean} */
            function checkIfBothAreOfObjectType(something, somethingElse) {
                return typeof something === 'object' && typeof somethingElse === 'object';
            }
        }
    }
}


export {TestSuite, Test, expect}
