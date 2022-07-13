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
 * @return {{toBe: toBe, notToBe: toBe}} expectation
 *  */
function expect(something) {
    return {
        /**@callback toBe
         * @param {any} somethingElse
         * @returns boolean*/
        toBe: function (somethingElse) {
            return checkIfSame(something, somethingElse);

            /**@param {any} something
             *@param {any} somethingElse */
            function checkIfSame(something, somethingElse) {
                let haveSameTypes = checkForSameType(something, somethingElse);
                if (!haveSameTypes) {
                    return false;
                }

                let areMaps = something instanceof Map && somethingElse instanceof Map
                if (areMaps) {
                    return checkIfMapsAreEqual(something, somethingElse)
                }

                let areObjects = checkIfBothAreOfObjectType(something, somethingElse);
                if (areObjects) {
                    return checkIfObjectsAreEqual(something, somethingElse);
                }
                return something === somethingElse;

                /**@param {Object} obj1
                 *@param {Object} obj2
                 * @returns {boolean} */
                function checkIfObjectsAreEqual(obj1, obj2) {
                    let obj1Keys = Object.keys(obj1);
                    let obj2Keys = Object.keys(obj2);
                    if (obj1Keys.length !== obj2Keys.length) {
                        return false;
                    }
                    for (const key in obj1) {
                        if (!key in obj2) {
                            return false;
                        }
                        if (!checkIfSame(obj1[key], obj2[key])) {
                            return false;
                        }
                    }

                    return true;
                }

                /**Used for maps
                 * @param {Map} something
                 * @param {Map} somethingElse
                 * @returns {boolean} */
                function checkIfMapsAreEqual(something, somethingElse) {
                    let areEqual = true;
                    something.forEach((element, index) => {
                        let otherElement = somethingElse.get(index);
                        if (!index in somethingElse) {
                            areEqual = false;
                        }
                        if (element !== otherElement) {
                            areEqual = false;
                        }
                        if (typeof element === 'object' && typeof otherElement === 'object') {
                            areEqual = checkIfSame(element, otherElement);
                        }
                    })
                    return areEqual;
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
        },
        notToBe: function (somethingElse) {
            return !this.toBe(somethingElse);
        }
    }
}

export {TestSuite, Test, expect}
