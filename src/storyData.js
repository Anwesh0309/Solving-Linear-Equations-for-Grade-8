/* =========================================================================
   STORY DATA — 8 slides. `body` is the on-screen text, `spoken` is the same
   text written out the way it should be read aloud (symbols -> words).
   ========================================================================= */
export const STORY_SLIDES = [
  {
    id: 1,
    title: "Unknowns Are Everywhere",
    image: "/assets/images/slide1.png",
    body: "Look around! A see-saw, a shop scale, and a phone bill all hide a missing number. Maya calls this hidden value x, a letter that holds its place until we solve for it.",
    spoken: "Look around! A see-saw, a shop scale, and a phone bill all hide a missing number. Maya calls this hidden value x, a letter that holds its place until we solve for it.",
    quote: "A variable is a letter that stands for an unknown number.",
    bubble: "Let's catch the hidden number, x!"
  },
  {
    id: 2,
    title: "Equations Are Balanced Scales",
    image: "/assets/images/slide2.png",
    body: "An equation says two things are equal, like 2x + 3 = 11. The equals sign is the balance point: the left side and the right side must always weigh exactly the same.",
    spoken: "An equation says two things are equal, like 2 x plus 3 equals 11. The equals sign is the balance point: the left side and the right side must always weigh exactly the same.",
    quote: "Left Side = Right Side. Always balanced!",
    bubble: "The = sign means \"is the same as\"!"
  },
  {
    id: 3,
    title: "The Golden Rule of Balance",
    image: "/assets/images/slide3.png",
    body: "To keep a scale balanced, whatever you do to one side, you must do to the other side. You can add to both sides, subtract from both sides, multiply both sides, or divide both sides.",
    spoken: "To keep a scale balanced, whatever you do to one side, you must do to the other side. You can add to both sides, subtract from both sides, multiply both sides, or divide both sides.",
    quote: "Golden Rule: Do the SAME thing to BOTH sides!",
    bubble: "Take a cube off the left? Take one off the right too!"
  },
  {
    id: 4,
    title: "Inverse Operations: The Undo Buttons",
    image: "/assets/images/slide4.png",
    body: "To free x, we undo whatever was done to it. Addition and subtraction undo each other, and multiplication and division undo each other. These pairs are called inverse operations.",
    spoken: "To free x, we undo whatever was done to it. Addition and subtraction undo each other, and multiplication and division undo each other. These pairs are called inverse operations.",
    quote: "+ undoes −   ·   × undoes ÷",
    bubble: "Inverse operations are the undo buttons for x!"
  },
  {
    id: 5,
    title: "One-Step Equations",
    image: "/assets/images/slide5.png",
    body: "In x + 5 = 12, the 5 is added to x, so subtract 5 from both sides to get x = 7. In 3x = 15, x is multiplied by 3, so divide both sides by 3 to get x = 5.",
    spoken: "In x plus 5 equals 12, the 5 is added to x, so subtract 5 from both sides to get x equals 7. In 3 x equals 15, x is multiplied by 3, so divide both sides by 3 to get x equals 5.",
    quote: "x + 5 = 12 → x = 7   ·   3x = 15 → x = 5",
    bubble: "Spot what is stuck to x, then undo it on both sides!"
  },
  {
    id: 6,
    title: "Two-Step Equations: Undo in Order",
    image: "/assets/images/slide6.png",
    body: "For 2x + 3 = 11, first subtract 3 from both sides to get 2x = 8. Then divide both sides by 2 to get x = 4. Undo adding or subtracting first, then undo multiplying or dividing.",
    spoken: "For 2 x plus 3 equals 11, first subtract 3 from both sides to get 2 x equals 8. Then divide both sides by 2 to get x equals 4. Undo adding or subtracting first, then undo multiplying or dividing.",
    quote: "2x + 3 = 11 → 2x = 8 → x = 4",
    bubble: "Unwrap a gift: ribbon first, then the box!"
  },
  {
    id: 7,
    title: "Real World Magic: Comparing Plans",
    image: "/assets/images/slide7.png",
    body: "Maya compares two gym plans. Plan A costs $4 plus $3 per visit, and Plan B costs $10 plus $2 per visit. They cost the same when 3x + 4 = 2x + 10. Subtract 2x from both sides to get x + 4 = 10, so x = 6 visits!",
    spoken: "Maya compares two gym plans. Plan A costs 4 dollars plus 3 dollars per visit, and Plan B costs 10 dollars plus 2 dollars per visit. They cost the same when 3 x plus 4 equals 2 x plus 10. Subtract 2 x from both sides to get x plus 4 equals 10, so x equals 6 visits!",
    quote: "x on both sides? Gather the x-terms on one side first!",
    bubble: "Equations tell us exactly when two things become equal!"
  },
  {
    id: 8,
    title: "Brackets, Checking & the Lab!",
    image: "/assets/images/slide8.png",
    body: "Brackets need expanding first: 3(x − 2) becomes 3x − 6. And always check your answer by putting it back into the equation. If both sides match, you are right! Now step into the lab to balance, undo, and solve!",
    spoken: "Brackets need expanding first: 3 times the bracket x minus 2 becomes 3 x minus 6. And always check your answer by putting it back into the equation. If both sides match, you are right! Now step into the lab to balance, undo, and solve!",
    quote: "Ready to test your equation-solving skills?",
    bubble: "Click below to enter the interactive lab!"
  }
];

export const WONDER = {
  heading: "How Can We Find a Hidden Number?",
  stat: "x = 8 in One Move!",
  bodyBefore: "Maya's balance scale holds a mystery box plus 3 cubes on one side and 11 cubes on the other. It balances perfectly! Take 3 cubes off BOTH sides and the box is revealed: it weighs just ",
  bodyHighlight: "8 cubes",
  bodyAfter: "!",
  spokenBody: "Maya's balance scale holds a mystery box plus 3 cubes on one side and 11 cubes on the other. It balances perfectly! Take 3 cubes off both sides and the box is revealed: it weighs just 8 cubes!",
  question: "How can we solve any equation without guessing?"
};

export const REFLECT_QUESTION = "What did you learn about solving linear equations? Explain it to Robo with an example!";
