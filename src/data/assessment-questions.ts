export type AssessmentQuestion = {
    id: number;
    level: "newbie" | "beginner" | "junior" | "mid" | "senior";
    title: string;
    description: string;
    instructions: string;
    starterCode: string;
    language: string;
    testCases: {
        input: string;
        expectedOutput: string;
        description: string;
    }[];
    points: number;
    timeEstimate: number; // in minutes
};

export const assessmentQuestions: AssessmentQuestion[] = [
    // NEWBIE LEVEL - Basic Syntax & Concepts
    {
        id: 1,
        level: "newbie",
        title: "Variable Declaration",
        description: "Understand how to declare and use variables in JavaScript",
        instructions:
            "Create a variable called 'greeting' and assign it the value 'Hello, World!'. Then log it to the console.",
        starterCode: `// Declare a variable called 'greeting' and assign it the value 'Hello, World!'
// Then log it to the console

`,
        language: "javascript",
        testCases: [
            {
                input: "",
                expectedOutput: "Hello, World!",
                description: "Should print 'Hello, World!' to the console",
            },
        ],
        points: 10,
        timeEstimate: 5,
    },
    {
        id: 2,
        level: "newbie",
        title: "Simple Math Operation",
        description: "Perform basic arithmetic operations",
        instructions: "Create a function called 'add' that takes two numbers and returns their sum.",
        starterCode: `// Create a function called 'add' that takes two numbers and returns their sum
function add(a, b) {
    // Your code here
}

// Test your function
console.log(add(5, 3)); // Should output: 8
console.log(add(10, 20)); // Should output: 30
`,
        language: "javascript",
        testCases: [
            {
                input: "add(5, 3)",
                expectedOutput: "8",
                description: "5 + 3 should equal 8",
            },
            {
                input: "add(10, 20)",
                expectedOutput: "30",
                description: "10 + 20 should equal 30",
            },
        ],
        points: 10,
        timeEstimate: 5,
    },

    // BEGINNER LEVEL - Functions & Conditionals
    {
        id: 3,
        level: "beginner",
        title: "Even or Odd",
        description: "Use conditionals to check if a number is even or odd",
        instructions:
            "Write a function called 'isEven' that returns true if a number is even, false otherwise.",
        starterCode: `// Write a function that checks if a number is even
function isEven(num) {
    // Your code here
}

// Test your function
console.log(isEven(4));  // Should output: true
console.log(isEven(7));  // Should output: false
console.log(isEven(0));  // Should output: true
`,
        language: "javascript",
        testCases: [
            {
                input: "isEven(4)",
                expectedOutput: "true",
                description: "4 is even",
            },
            {
                input: "isEven(7)",
                expectedOutput: "false",
                description: "7 is odd",
            },
            {
                input: "isEven(0)",
                expectedOutput: "true",
                description: "0 is even",
            },
        ],
        points: 15,
        timeEstimate: 7,
    },
    {
        id: 4,
        level: "beginner",
        title: "FizzBuzz",
        description: "Classic programming challenge using conditionals",
        instructions:
            "Write a function that returns 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for multiples of both, or the number itself otherwise.",
        starterCode: `// Write the FizzBuzz function
function fizzBuzz(num) {
    // Your code here
}

// Test your function
console.log(fizzBuzz(3));   // Should output: "Fizz"
console.log(fizzBuzz(5));   // Should output: "Buzz"
console.log(fizzBuzz(15));  // Should output: "FizzBuzz"
console.log(fizzBuzz(7));   // Should output: 7
`,
        language: "javascript",
        testCases: [
            {
                input: "fizzBuzz(3)",
                expectedOutput: "Fizz",
                description: "3 is divisible by 3",
            },
            {
                input: "fizzBuzz(5)",
                expectedOutput: "Buzz",
                description: "5 is divisible by 5",
            },
            {
                input: "fizzBuzz(15)",
                expectedOutput: "FizzBuzz",
                description: "15 is divisible by both 3 and 5",
            },
            {
                input: "fizzBuzz(7)",
                expectedOutput: "7",
                description: "7 is not divisible by 3 or 5",
            },
        ],
        points: 20,
        timeEstimate: 10,
    },

    // JUNIOR LEVEL - Arrays & Loops
    {
        id: 5,
        level: "junior",
        title: "Array Sum",
        description: "Work with arrays and loops",
        instructions:
            "Write a function called 'sumArray' that takes an array of numbers and returns their sum.",
        starterCode: `// Write a function that sums all numbers in an array
function sumArray(numbers) {
    // Your code here
}

// Test your function
console.log(sumArray([1, 2, 3, 4, 5]));     // Should output: 15
console.log(sumArray([10, 20, 30]));        // Should output: 60
console.log(sumArray([]));                  // Should output: 0
`,
        language: "javascript",
        testCases: [
            {
                input: "sumArray([1, 2, 3, 4, 5])",
                expectedOutput: "15",
                description: "Sum of [1,2,3,4,5] is 15",
            },
            {
                input: "sumArray([10, 20, 30])",
                expectedOutput: "60",
                description: "Sum of [10,20,30] is 60",
            },
            {
                input: "sumArray([])",
                expectedOutput: "0",
                description: "Sum of empty array is 0",
            },
        ],
        points: 20,
        timeEstimate: 10,
    },
    {
        id: 6,
        level: "junior",
        title: "Find Maximum",
        description: "Find the largest number in an array",
        instructions:
            "Write a function called 'findMax' that returns the largest number in an array.",
        starterCode: `// Write a function that finds the maximum number in an array
function findMax(numbers) {
    // Your code here
}

// Test your function
console.log(findMax([1, 5, 3, 9, 2]));      // Should output: 9
console.log(findMax([10, 20, 30, 5]));      // Should output: 30
console.log(findMax([-5, -2, -10]));        // Should output: -2
`,
        language: "javascript",
        testCases: [
            {
                input: "findMax([1, 5, 3, 9, 2])",
                expectedOutput: "9",
                description: "Maximum of [1,5,3,9,2] is 9",
            },
            {
                input: "findMax([10, 20, 30, 5])",
                expectedOutput: "30",
                description: "Maximum of [10,20,30,5] is 30",
            },
            {
                input: "findMax([-5, -2, -10])",
                expectedOutput: "-2",
                description: "Maximum of [-5,-2,-10] is -2",
            },
        ],
        points: 20,
        timeEstimate: 12,
    },

    // MID LEVEL - String Manipulation & Objects
    {
        id: 7,
        level: "mid",
        title: "Reverse String",
        description: "Manipulate strings effectively",
        instructions:
            "Write a function called 'reverseString' that reverses a string without using the built-in reverse method.",
        starterCode: `// Write a function that reverses a string
function reverseString(str) {
    // Your code here (do not use .reverse())
}

// Test your function
console.log(reverseString("hello"));        // Should output: "olleh"
console.log(reverseString("JavaScript"));   // Should output: "tpircSavaJ"
console.log(reverseString(""));             // Should output: ""
`,
        language: "javascript",
        testCases: [
            {
                input: 'reverseString("hello")',
                expectedOutput: "olleh",
                description: 'Reverse of "hello" is "olleh"',
            },
            {
                input: 'reverseString("JavaScript")',
                expectedOutput: "tpircSavaJ",
                description: 'Reverse of "JavaScript" is "tpircSavaJ"',
            },
            {
                input: 'reverseString("")',
                expectedOutput: "",
                description: "Reverse of empty string is empty string",
            },
        ],
        points: 25,
        timeEstimate: 15,
    },
    {
        id: 8,
        level: "mid",
        title: "Count Vowels",
        description: "Count occurrences in strings",
        instructions:
            "Write a function called 'countVowels' that counts the number of vowels (a, e, i, o, u) in a string (case insensitive).",
        starterCode: `// Write a function that counts vowels in a string
function countVowels(str) {
    // Your code here
}

// Test your function
console.log(countVowels("hello"));          // Should output: 2
console.log(countVowels("JavaScript"));     // Should output: 3
console.log(countVowels("xyz"));            // Should output: 0
`,
        language: "javascript",
        testCases: [
            {
                input: 'countVowels("hello")',
                expectedOutput: "2",
                description: '"hello" has 2 vowels (e, o)',
            },
            {
                input: 'countVowels("JavaScript")',
                expectedOutput: "3",
                description: '"JavaScript" has 3 vowels (a, a, i)',
            },
            {
                input: 'countVowels("xyz")',
                expectedOutput: "0",
                description: '"xyz" has no vowels',
            },
        ],
        points: 25,
        timeEstimate: 15,
    },

    // SENIOR LEVEL - Algorithms & Data Structures
    {
        id: 9,
        level: "senior",
        title: "Palindrome Checker",
        description: "Check if a string is a palindrome",
        instructions:
            "Write a function called 'isPalindrome' that checks if a string is a palindrome (reads the same forwards and backwards), ignoring spaces and punctuation.",
        starterCode: `// Write a function that checks if a string is a palindrome
function isPalindrome(str) {
    // Your code here
}

// Test your function
console.log(isPalindrome("racecar"));           // Should output: true
console.log(isPalindrome("hello"));             // Should output: false
console.log(isPalindrome("A man a plan a canal Panama")); // Should output: true
`,
        language: "javascript",
        testCases: [
            {
                input: 'isPalindrome("racecar")',
                expectedOutput: "true",
                description: '"racecar" is a palindrome',
            },
            {
                input: 'isPalindrome("hello")',
                expectedOutput: "false",
                description: '"hello" is not a palindrome',
            },
            {
                input: 'isPalindrome("A man a plan a canal Panama")',
                expectedOutput: "true",
                description: "Should ignore spaces and case",
            },
        ],
        points: 30,
        timeEstimate: 20,
    },
    {
        id: 10,
        level: "senior",
        title: "Two Sum Problem",
        description: "Find two numbers that add up to a target",
        instructions:
            "Write a function called 'twoSum' that takes an array of numbers and a target sum. Return an array of the two indices whose values add up to the target. You may assume there's exactly one solution.",
        starterCode: `// Write a function that finds two numbers that sum to target
function twoSum(nums, target) {
    // Your code here
}

// Test your function
console.log(twoSum([2, 7, 11, 15], 9));     // Should output: [0, 1]
console.log(twoSum([3, 2, 4], 6));          // Should output: [1, 2]
console.log(twoSum([3, 3], 6));             // Should output: [0, 1]
`,
        language: "javascript",
        testCases: [
            {
                input: "twoSum([2, 7, 11, 15], 9)",
                expectedOutput: "[0, 1]",
                description: "indices 0 and 1 (2 + 7 = 9)",
            },
            {
                input: "twoSum([3, 2, 4], 6)",
                expectedOutput: "[1, 2]",
                description: "indices 1 and 2 (2 + 4 = 6)",
            },
            {
                input: "twoSum([3, 3], 6)",
                expectedOutput: "[0, 1]",
                description: "indices 0 and 1 (3 + 3 = 6)",
            },
        ],
        points: 35,
        timeEstimate: 25,
    },
];

// Helper function to get questions by level
export function getQuestionsByLevel(level: string): AssessmentQuestion[] {
    return assessmentQuestions.filter((q) => q.level === level);
}

// Helper function to calculate total points
export function calculateTotalPoints(questions: AssessmentQuestion[]): number {
    return questions.reduce((sum, q) => sum + q.points, 0);
}

// Scoring thresholds to determine skill level
export const scoringThresholds = {
    newbie: { min: 0, max: 20 },      // 0-20 points: Basic syntax understanding
    beginner: { min: 21, max: 55 },   // 21-55 points: Conditionals and functions
    junior: { min: 56, max: 95 },     // 56-95 points: Arrays and loops
    mid: { min: 96, max: 145 },       // 96-145 points: String manipulation and objects
    senior: { min: 146, max: 210 },   // 146-210 points: Algorithms and problem solving
};

export function determineSkillLevel(score: number): string {
    if (score <= scoringThresholds.newbie.max) return "NEWBIE";
    if (score <= scoringThresholds.beginner.max) return "BEGINNER";
    if (score <= scoringThresholds.junior.max) return "JUNIOR";
    if (score <= scoringThresholds.mid.max) return "MID";
    return "SENIOR";
}
