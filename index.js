const _ = require("lodash");
const simpleArray = require("./data/simple-array.json");
const yogaClasses = require("./data/yoga.json");
const members = require("./data/members.json");
const newMember = require("./data/new-member");

/**
 * Return the number of keys in an object
 * @param {Object} obj -
 * @return {number} The number of keys in the object
 */
function numberOfKeys(obj) {

  let totalKeys = 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      totalKeys++;
    }
  }
  return totalKeys;
}

/**
 * Remove the falsy values in a numbers array and return the sum
 * @param {numbers[]} array - An array of numbers that can also contain some falsy values
 * @return {number} The sum of the numbers in an array
 */
function sumNumbers(array) {
// store truthy values in new variable
 const filteredArray = array.filter((value) => !!value);
// use reduce to add all numbers
  const sum = filteredArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return sum;


}
/**
 * Convert a two-dimensional array of new member data (each inner array having two values: the first being the key, the second being the value) into an object
 * @param {Array[]} member -
 * @return {number} The sum of the numbers in an array
 */
function newMemberArrayToObject(member) {
  let groupedClasses = {}

  member.forEach((yogaClass) => { 
    // get the key value from yogaClass
    const [key, value] = yogaClass
    // add key-value to object groupedClasses
    groupedClasses[key] = value
  })
  return groupedClasses
}

/**
 * Return an array of objects that grouped by instructors from the classes array of objects
 * @param {Object[]} collection - an array of yoga class objects
 * @return {Object[]} - the reshaped collection where the classes are grouped by instructor name
 */
function groupClassByInstructor(collection) {
const groupedClasses ={}
collection.forEach((yogaClass) => {
// get instructor name
const instructor = yogaClass.instructor
 // if instructor is not in groupedClass object, make new array
if (!groupedClasses[instructor]) {
  groupedClasses[instructor] = []
}

// add current classes that belong to instructor to their array
groupedClasses[instructor].push(yogaClass)

})
 //return groupedClasses
 return groupedClasses
}

/**
 * Remove the age key from the members array of object
 * @param {Object} collection - an array of member objects
 * @return {number} The array of member objects, each one without the age field
 */
function omitAgeFromMembers(collection) {
  return collection.map((member) => {
  
    const { age, ...memberWithoutAge } = member;
    return memberWithoutAge;
  });
}

/**
 * Return the count of the number of classes a particular instructor teaches
 * @param {Object[]} collection - An array of yoga class objects
 * @param {String} instructorName - The name of the instructor
 * @return {number} The sum of the numbers in an array
 */
function countClassesByInstructor(collection, instructor) {
  let classCount = 0
  
  // loop through the collection of yoga classes
  for (const yogaClass of collection) {
   
    // check current class, compare instructor
    if (yogaClass.instructor === instructor) {
      // if matchs up, increment the classCount
      classCount++;
    }  
  }
  if (classCount === 0 ) {
    return 'There is no instructor by that name.'
  }
  return classCount;
}

/**
 * Remove inactive members from the members array
 * @param {Object} collection - an array of member objects
 * @return {number} The array of member objects with only active members
 */
function removeInactiveMembers(collection) {
  console.log(collection
    )

  const activeMembers = collection.filter((member) => member.currentMember === true);

  return activeMembers;
}

/**
 * Get a list of unique class titles and their price
 * @param {Object} collection - an array of yoga class objects
 * @return {number} An array of objects that have a unique title and a price
 */
function getUniqueClasses(collection) {
  let uniqueClass = {}
  

  collection.forEach((yogaClass) => {
    const price = yogaClass.priceInCents
    const title = yogaClass.title 

    if (!uniqueClass[title] || price < uniqueClass[title].price) {
      uniqueClass[title] = { title, priceInCents: price};
    }
  });


  const uniqueClassesArray = Object.values(uniqueClass);

  return uniqueClassesArray;

}

/**
 * Get a list of classes organized by title, then by level.
 * The titles should be in ascending order, the levels should be in descending order
 * @param {Object} collection - an array of yoga class objects
 * @return {number} An array of objects that are organized by title then by level. The array should only have the title, instructor, and level fields
 */
function orderClassesByTitleAndLevel(collection) {

    collection.sort((classA, classB) => {
      if (classA.title < classB.title) {
        return -1;
      } else if (classA.title > classB.title) {
        return 1;
      }

      if (classA.level > classB.level) {
        return -1;
      } else if (classA.level < classB.level) {
        return 1;
      }
      return 0;
    });
  

    const sortedClasses = collection.map(({ title, instructor, level }) => ({
      title,
      instructor,
      level,
    }));
  
    return sortedClasses;
  }
  



module.exports = {
  numberOfKeys,
  sumNumbers,
  newMemberArrayToObject,
  groupClassByInstructor,
  omitAgeFromMembers,
  countClassesByInstructor,
  removeInactiveMembers,
  getUniqueClasses,
  orderClassesByTitleAndLevel,
};
