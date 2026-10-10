/* =========================================================================
   100 CURATED PRACTICE QUESTIONS ACROSS 10 THEMED GAME WORLDS (GRADE 8)
   10 Worlds × 10 Questions each = 100 non-repeating questions.
   Each question has:
     - On-screen math prompt
     - Spoken phonetic narration text (for ElevenLabs Alice)
     - 4 multiple-choice options with integer answers & misconceptions
     - Step-by-step explanation
   ========================================================================= */

export const CURATED_PRACTICE_QUESTIONS = {
  // --- WORLD 1: Box Market (One-Step Addition & Subtraction) ---
  0: [
    {
      id: "w1_q1",
      prompt: "Solve for x: x + 4 = 11",
      spoken: "Solve for x: x plus 4 equals 11.",
      options: ["x = 7", "x = 15", "x = 8", "x = 6"],
      correctIndex: 0,
      explanation: "Subtract 4 from both sides: x = 11 − 4 = 7.",
      diagram: { left: "x + 4", right: "11" }
    },
    {
      id: "w1_q2",
      prompt: "Solve for x: x − 5 = 12",
      spoken: "Solve for x: x minus 5 equals 12.",
      options: ["x = 7", "x = 17", "x = 18", "x = 16"],
      correctIndex: 1,
      explanation: "Add 5 to both sides: x = 12 + 5 = 17.",
      diagram: { left: "x − 5", right: "12" }
    },
    {
      id: "w1_q3",
      prompt: "Solve for x: x + 9 = 20",
      spoken: "Solve for x: x plus 9 equals 20.",
      options: ["x = 11", "x = 29", "x = 10", "x = 12"],
      correctIndex: 0,
      explanation: "Subtract 9 from both sides: x = 20 − 9 = 11.",
      diagram: { left: "x + 9", right: "20" }
    },
    {
      id: "w1_q4",
      prompt: "Solve for x: x − 7 = 8",
      spoken: "Solve for x: x minus 7 equals 8.",
      options: ["x = 1", "x = 15", "x = 14", "x = 16"],
      correctIndex: 1,
      explanation: "Add 7 to both sides: x = 8 + 7 = 15.",
      diagram: { left: "x − 7", right: "8" }
    },
    {
      id: "w1_q5",
      prompt: "Solve for x: 6 + x = 15",
      spoken: "Solve for x: 6 plus x equals 15.",
      options: ["x = 8", "x = 21", "x = 9", "x = 7"],
      correctIndex: 2,
      explanation: "Subtract 6 from both sides: x = 15 − 6 = 9.",
      diagram: { left: "6 + x", right: "15" }
    },
    {
      id: "w1_q6",
      prompt: "Solve for x: x − 13 = 14",
      spoken: "Solve for x: x minus 13 equals 14.",
      options: ["x = 27", "x = 1", "x = 26", "x = 28"],
      correctIndex: 0,
      explanation: "Add 13 to both sides: x = 14 + 13 = 27.",
      diagram: { left: "x − 13", right: "14" }
    },
    {
      id: "w1_q7",
      prompt: "Solve for x: x + 18 = 30",
      spoken: "Solve for x: x plus 18 equals 30.",
      options: ["x = 48", "x = 12", "x = 11", "x = 13"],
      correctIndex: 1,
      explanation: "Subtract 18 from both sides: x = 30 − 18 = 12.",
      diagram: { left: "x + 18", right: "30" }
    },
    {
      id: "w1_q8",
      prompt: "Solve for x: x − 25 = 25",
      spoken: "Solve for x: x minus 25 equals 25.",
      options: ["x = 0", "x = 50", "x = 45", "x = 55"],
      correctIndex: 1,
      explanation: "Add 25 to both sides: x = 25 + 25 = 50.",
      diagram: { left: "x − 25", right: "25" }
    },
    {
      id: "w1_q9",
      prompt: "Solve for x: 14 + x = 33",
      spoken: "Solve for x: 14 plus x equals 33.",
      options: ["x = 19", "x = 47", "x = 18", "x = 20"],
      correctIndex: 0,
      explanation: "Subtract 14 from both sides: x = 33 − 14 = 19.",
      diagram: { left: "14 + x", right: "33" }
    },
    {
      id: "w1_q10",
      prompt: "Solve for x: x − 32 = 18",
      spoken: "Solve for x: x minus 32 equals 18.",
      options: ["x = 14", "x = 48", "x = 50", "x = 52"],
      correctIndex: 2,
      explanation: "Add 32 to both sides: x = 18 + 32 = 50.",
      diagram: { left: "x − 32", right: "18" }
    }
  ],

  // --- WORLD 2: Cube Canyon (One-Step All Operations) ---
  1: [
    {
      id: "w2_q1",
      prompt: "Solve for x: 3x = 18",
      spoken: "Solve for x: 3 x equals 18.",
      options: ["x = 6", "x = 15", "x = 21", "x = 5"],
      correctIndex: 0,
      explanation: "Divide both sides by 3: x = 18 ÷ 3 = 6.",
      diagram: { left: "3x", right: "18" }
    },
    {
      id: "w2_q2",
      prompt: "Solve for x: x / 4 = 5",
      spoken: "Solve for x: x divided by 4 equals 5.",
      options: ["x = 9", "x = 1", "x = 20", "x = 24"],
      correctIndex: 2,
      explanation: "Multiply both sides by 4: x = 5 × 4 = 20.",
      diagram: { left: "x / 4", right: "5" }
    },
    {
      id: "w2_q3",
      prompt: "Solve for x: 7x = 49",
      spoken: "Solve for x: 7 x equals 49.",
      options: ["x = 42", "x = 7", "x = 8", "x = 6"],
      correctIndex: 1,
      explanation: "Divide both sides by 7: x = 49 ÷ 7 = 7.",
      diagram: { left: "7x", right: "49" }
    },
    {
      id: "w2_q4",
      prompt: "Solve for x: x / 6 = 7",
      spoken: "Solve for x: x divided by 6 equals 7.",
      options: ["x = 42", "x = 13", "x = 48", "x = 36"],
      correctIndex: 0,
      explanation: "Multiply both sides by 6: x = 7 × 6 = 42.",
      diagram: { left: "x / 6", right: "7" }
    },
    {
      id: "w2_q5",
      prompt: "Solve for x: 9x = 72",
      spoken: "Solve for x: 9 x equals 72.",
      options: ["x = 7", "x = 63", "x = 8", "x = 9"],
      correctIndex: 2,
      explanation: "Divide both sides by 9: x = 72 ÷ 9 = 8.",
      diagram: { left: "9x", right: "72" }
    },
    {
      id: "w2_q6",
      prompt: "Solve for x: x / 8 = 9",
      spoken: "Solve for x: x divided by 8 equals 9.",
      options: ["x = 17", "x = 72", "x = 81", "x = 64"],
      correctIndex: 1,
      explanation: "Multiply both sides by 8: x = 9 × 8 = 72.",
      diagram: { left: "x / 8", right: "9" }
    },
    {
      id: "w2_q7",
      prompt: "Solve for x: 12x = 96",
      spoken: "Solve for x: 12 x equals 96.",
      options: ["x = 8", "x = 7", "x = 9", "x = 84"],
      correctIndex: 0,
      explanation: "Divide both sides by 12: x = 96 ÷ 12 = 8.",
      diagram: { left: "12x", right: "96" }
    },
    {
      id: "w2_q8",
      prompt: "Solve for x: x / 5 = 11",
      spoken: "Solve for x: x divided by 5 equals 11.",
      options: ["x = 16", "x = 50", "x = 55", "x = 60"],
      correctIndex: 2,
      explanation: "Multiply both sides by 5: x = 11 × 5 = 55.",
      diagram: { left: "x / 5", right: "11" }
    },
    {
      id: "w2_q9",
      prompt: "Solve for x: 15x = 75",
      spoken: "Solve for x: 15 x equals 75.",
      options: ["x = 60", "x = 5", "x = 4", "x = 6"],
      correctIndex: 1,
      explanation: "Divide both sides by 15: x = 75 ÷ 15 = 5.",
      diagram: { left: "15x", right: "75" }
    },
    {
      id: "w2_q10",
      prompt: "Solve for x: x / 9 = 12",
      spoken: "Solve for x: x divided by 9 equals 12.",
      options: ["x = 108", "x = 21", "x = 99", "x = 118"],
      correctIndex: 0,
      explanation: "Multiply both sides by 9: x = 12 × 9 = 108.",
      diagram: { left: "x / 9", right: "12" }
    }
  ],

  // --- WORLD 3: Taxi Town (Two-Step Equations) ---
  2: [
    {
      id: "w3_q1",
      prompt: "Solve for x: 2x + 3 = 11",
      spoken: "Solve for x: 2 x plus 3 equals 11.",
      options: ["x = 4", "x = 7", "x = 5", "x = 8"],
      correctIndex: 0,
      explanation: "Subtract 3: 2x = 8. Divide by 2: x = 4.",
      diagram: { left: "2x + 3", right: "11" }
    },
    {
      id: "w3_q2",
      prompt: "Solve for x: 3x − 4 = 14",
      spoken: "Solve for x: 3 x minus 4 equals 14.",
      options: ["x = 5", "x = 6", "x = 18", "x = 7"],
      correctIndex: 1,
      explanation: "Add 4: 3x = 18. Divide by 3: x = 6.",
      diagram: { left: "3x − 4", right: "14" }
    },
    {
      id: "w3_q3",
      prompt: "Solve for x: 4x + 5 = 25",
      spoken: "Solve for x: 4 x plus 5 equals 25.",
      options: ["x = 5", "x = 6", "x = 20", "x = 4"],
      correctIndex: 0,
      explanation: "Subtract 5: 4x = 20. Divide by 4: x = 5.",
      diagram: { left: "4x + 5", right: "25" }
    },
    {
      id: "w3_q4",
      prompt: "Solve for x: 5x − 7 = 28",
      spoken: "Solve for x: 5 x minus 7 equals 28.",
      options: ["x = 8", "x = 35", "x = 6", "x = 7"],
      correctIndex: 3,
      explanation: "Add 7: 5x = 35. Divide by 5: x = 7.",
      diagram: { left: "5x − 7", right: "28" }
    },
    {
      id: "w3_q5",
      prompt: "Solve for x: 6x + 8 = 32",
      spoken: "Solve for x: 6 x plus 8 equals 32.",
      options: ["x = 4", "x = 5", "x = 24", "x = 3"],
      correctIndex: 0,
      explanation: "Subtract 8: 6x = 24. Divide by 6: x = 4.",
      diagram: { left: "6x + 8", right: "32" }
    },
    {
      id: "w3_q6",
      prompt: "Solve for x: 7x − 9 = 40",
      spoken: "Solve for x: 7 x minus 9 equals 40.",
      options: ["x = 6", "x = 7", "x = 49", "x = 8"],
      correctIndex: 1,
      explanation: "Add 9: 7x = 49. Divide by 7: x = 7.",
      diagram: { left: "7x − 9", right: "40" }
    },
    {
      id: "w3_q7",
      prompt: "Solve for x: 8x + 12 = 60",
      spoken: "Solve for x: 8 x plus 12 equals 60.",
      options: ["x = 5", "x = 6", "x = 48", "x = 7"],
      correctIndex: 1,
      explanation: "Subtract 12: 8x = 48. Divide by 8: x = 6.",
      diagram: { left: "8x + 12", right: "60" }
    },
    {
      id: "w3_q8",
      prompt: "Solve for x: 9x − 15 = 48",
      spoken: "Solve for x: 9 x minus 15 equals 48.",
      options: ["x = 6", "x = 8", "x = 7", "x = 9"],
      correctIndex: 2,
      explanation: "Add 15: 9x = 63. Divide by 9: x = 7.",
      diagram: { left: "9x − 15", right: "48" }
    },
    {
      id: "w3_q9",
      prompt: "Solve for x: 2x + 15 = 31",
      spoken: "Solve for x: 2 x plus 15 equals 31.",
      options: ["x = 8", "x = 16", "x = 7", "x = 9"],
      correctIndex: 0,
      explanation: "Subtract 15: 2x = 16. Divide by 2: x = 8.",
      diagram: { left: "2x + 15", right: "31" }
    },
    {
      id: "w3_q10",
      prompt: "Solve for x: 10x − 23 = 57",
      spoken: "Solve for x: 10 x minus 23 equals 57.",
      options: ["x = 9", "x = 8", "x = 7", "x = 80"],
      correctIndex: 1,
      explanation: "Add 23: 10x = 80. Divide by 10: x = 8.",
      diagram: { left: "10x − 23", right: "57" }
    }
  ],

  // --- WORLD 4: Phone Plaza (Two-Step & Real-World Word Problems) ---
  3: [
    {
      id: "w4_q1",
      prompt: "A phone plan costs $10 base fee plus $3 per gigabyte. The total bill was $28. Solve 3x + 10 = 28.",
      spoken: "A phone plan costs 10 dollars base fee plus 3 dollars per gigabyte. The total bill was 28 dollars. Solve 3 x plus 10 equals 28.",
      options: ["x = 6 GB", "x = 18 GB", "x = 5 GB", "x = 7 GB"],
      correctIndex: 0,
      explanation: "Subtract 10: 3x = 18. Divide by 3: x = 6 gigabytes.",
      diagram: { left: "3x + 10", right: "28" }
    },
    {
      id: "w4_q2",
      prompt: "Maya bought a $5 notebook and x pens at $2 each. Total cost: $17. Solve 2x + 5 = 17.",
      spoken: "Maya bought a 5 dollar notebook and x pens at 2 dollars each. Total cost is 17 dollars. Solve 2 x plus 5 equals 17.",
      options: ["x = 5 pens", "x = 6 pens", "x = 7 pens", "x = 12 pens"],
      correctIndex: 1,
      explanation: "Subtract 5: 2x = 12. Divide by 2: x = 6 pens.",
      diagram: { left: "2x + 5", right: "17" }
    },
    {
      id: "w4_q3",
      prompt: "Solve for x: 4x − 11 = 29",
      spoken: "Solve for x: 4 x minus 11 equals 29.",
      options: ["x = 9", "x = 11", "x = 10", "x = 8"],
      correctIndex: 2,
      explanation: "Add 11: 4x = 40. Divide by 4: x = 10.",
      diagram: { left: "4x − 11", right: "29" }
    },
    {
      id: "w4_q4",
      prompt: "Movie tickets cost $8 each plus a $4 online booking fee. Total paid: $36. Solve 8x + 4 = 36.",
      spoken: "Movie tickets cost 8 dollars each plus a 4 dollar booking fee. Total paid is 36 dollars. Solve 8 x plus 4 equals 36.",
      options: ["x = 4 tickets", "x = 5 tickets", "x = 3 tickets", "x = 6 tickets"],
      correctIndex: 0,
      explanation: "Subtract 4: 8x = 32. Divide by 8: x = 4 tickets.",
      diagram: { left: "8x + 4", right: "36" }
    },
    {
      id: "w4_q5",
      prompt: "Solve for x: 5x + 14 = 44",
      spoken: "Solve for x: 5 x plus 14 equals 44.",
      options: ["x = 7", "x = 6", "x = 30", "x = 5"],
      correctIndex: 1,
      explanation: "Subtract 14: 5x = 30. Divide by 5: x = 6.",
      diagram: { left: "5x + 14", right: "44" }
    },
    {
      id: "w4_q6",
      prompt: "A plumber charges a $40 callout fee plus $25 per hour. Total bill: $115. Solve 25x + 40 = 115.",
      spoken: "A plumber charges a 40 dollar callout fee plus 25 dollars per hour. Total bill is 115 dollars. Solve 25 x plus 40 equals 115.",
      options: ["x = 2 hours", "x = 3 hours", "x = 4 hours", "x = 75 hours"],
      correctIndex: 1,
      explanation: "Subtract 40: 25x = 75. Divide by 25: x = 3 hours.",
      diagram: { left: "25x + 40", right: "115" }
    },
    {
      id: "w4_q7",
      prompt: "Solve for x: 6x − 18 = 30",
      spoken: "Solve for x: 6 x minus 18 equals 30.",
      options: ["x = 8", "x = 7", "x = 9", "x = 2"],
      correctIndex: 0,
      explanation: "Add 18: 6x = 48. Divide by 6: x = 8.",
      diagram: { left: "6x − 18", right: "30" }
    },
    {
      id: "w4_q8",
      prompt: "A fitness app charges $12 monthly plus $4 per workout session. Total bill: $44. Solve 4x + 12 = 44.",
      spoken: "A fitness app charges 12 dollars monthly plus 4 dollars per workout session. Total bill is 44 dollars. Solve 4 x plus 12 equals 44.",
      options: ["x = 9 sessions", "x = 7 sessions", "x = 8 sessions", "x = 10 sessions"],
      correctIndex: 2,
      explanation: "Subtract 12: 4x = 32. Divide by 4: x = 8 sessions.",
      diagram: { left: "4x + 12", right: "44" }
    },
    {
      id: "w4_q9",
      prompt: "Solve for x: 7x + 16 = 58",
      spoken: "Solve for x: 7 x plus 16 equals 58.",
      options: ["x = 6", "x = 7", "x = 5", "x = 42"],
      correctIndex: 0,
      explanation: "Subtract 16: 7x = 42. Divide by 7: x = 6.",
      diagram: { left: "7x + 16", right: "58" }
    },
    {
      id: "w4_q10",
      prompt: "Solve for x: 9x − 21 = 51",
      spoken: "Solve for x: 9 x minus 21 equals 51.",
      options: ["x = 7", "x = 8", "x = 9", "x = 72"],
      correctIndex: 1,
      explanation: "Add 21: 9x = 72. Divide by 9: x = 8.",
      diagram: { left: "9x − 21", right: "51" }
    }
  ],

  // --- WORLD 5: Bakery Balance (x on Both Sides) ---
  4: [
    {
      id: "w5_q1",
      prompt: "Solve for x: 3x + 4 = 2x + 10",
      spoken: "Solve for x: 3 x plus 4 equals 2 x plus 10.",
      options: ["x = 6", "x = 7", "x = 5", "x = 14"],
      correctIndex: 0,
      explanation: "Subtract 2x: x + 4 = 10. Subtract 4: x = 6.",
      diagram: { left: "3x + 4", right: "2x + 10" }
    },
    {
      id: "w5_q2",
      prompt: "Solve for x: 5x + 3 = 3x + 15",
      spoken: "Solve for x: 5 x plus 3 equals 3 x plus 15.",
      options: ["x = 5", "x = 6", "x = 7", "x = 4"],
      correctIndex: 1,
      explanation: "Subtract 3x: 2x + 3 = 15. Subtract 3: 2x = 12. Divide by 2: x = 6.",
      diagram: { left: "5x + 3", right: "3x + 15" }
    },
    {
      id: "w5_q3",
      prompt: "Solve for x: 4x − 2 = 2x + 8",
      spoken: "Solve for x: 4 x minus 2 equals 2 x plus 8.",
      options: ["x = 4", "x = 6", "x = 5", "x = 3"],
      correctIndex: 2,
      explanation: "Subtract 2x: 2x − 2 = 8. Add 2: 2x = 10. Divide by 2: x = 5.",
      diagram: { left: "4x − 2", right: "2x + 8" }
    },
    {
      id: "w5_q4",
      prompt: "Solve for x: 6x + 5 = 4x + 19",
      spoken: "Solve for x: 6 x plus 5 equals 4 x plus 19.",
      options: ["x = 7", "x = 6", "x = 8", "x = 5"],
      correctIndex: 0,
      explanation: "Subtract 4x: 2x + 5 = 19. Subtract 5: 2x = 14. Divide by 2: x = 7.",
      diagram: { left: "6x + 5", right: "4x + 19" }
    },
    {
      id: "w5_q5",
      prompt: "Solve for x: 7x − 6 = 3x + 18",
      spoken: "Solve for x: 7 x minus 6 equals 3 x plus 18.",
      options: ["x = 5", "x = 6", "x = 7", "x = 4"],
      correctIndex: 1,
      explanation: "Subtract 3x: 4x − 6 = 18. Add 6: 4x = 24. Divide by 4: x = 6.",
      diagram: { left: "7x − 6", right: "3x + 18" }
    },
    {
      id: "w5_q6",
      prompt: "Solve for x: 8x + 7 = 5x + 28",
      spoken: "Solve for x: 8 x plus 7 equals 5 x plus 28.",
      options: ["x = 6", "x = 7", "x = 8", "x = 9"],
      correctIndex: 1,
      explanation: "Subtract 5x: 3x + 7 = 28. Subtract 7: 3x = 21. Divide by 3: x = 7.",
      diagram: { left: "8x + 7", right: "5x + 28" }
    },
    {
      id: "w5_q7",
      prompt: "Solve for x: 5x − 9 = 2x + 12",
      spoken: "Solve for x: 5 x minus 9 equals 2 x plus 12.",
      options: ["x = 8", "x = 6", "x = 7", "x = 5"],
      correctIndex: 2,
      explanation: "Subtract 2x: 3x − 9 = 12. Add 9: 3x = 21. Divide by 3: x = 7.",
      diagram: { left: "5x − 9", right: "2x + 12" }
    },
    {
      id: "w5_q8",
      prompt: "Solve for x: 9x + 2 = 6x + 26",
      spoken: "Solve for x: 9 x plus 2 equals 6 x plus 26.",
      options: ["x = 8", "x = 7", "x = 9", "x = 6"],
      correctIndex: 0,
      explanation: "Subtract 6x: 3x + 2 = 26. Subtract 2: 3x = 24. Divide by 3: x = 8.",
      diagram: { left: "9x + 2", right: "6x + 26" }
    },
    {
      id: "w5_q9",
      prompt: "Solve for x: 6x − 15 = x + 25",
      spoken: "Solve for x: 6 x minus 15 equals x plus 25.",
      options: ["x = 7", "x = 8", "x = 9", "x = 6"],
      correctIndex: 1,
      explanation: "Subtract x: 5x − 15 = 25. Add 15: 5x = 40. Divide by 5: x = 8.",
      diagram: { left: "6x − 15", right: "x + 25" }
    },
    {
      id: "w5_q10",
      prompt: "Solve for x: 10x + 8 = 4x + 56",
      spoken: "Solve for x: 10 x plus 8 equals 4 x plus 56.",
      options: ["x = 7", "x = 9", "x = 8", "x = 6"],
      correctIndex: 2,
      explanation: "Subtract 4x: 6x + 8 = 56. Subtract 8: 6x = 48. Divide by 6: x = 8.",
      diagram: { left: "10x + 8", right: "4x + 56" }
    }
  ],

  // --- WORLD 6: Bracket Bridge (Equations with Brackets) ---
  5: [
    {
      id: "w6_q1",
      prompt: "Solve for x: 2(x + 3) = 14",
      spoken: "Solve for x: 2 times the bracket x plus 3 equals 14.",
      options: ["x = 4", "x = 5", "x = 3", "x = 7"],
      correctIndex: 0,
      explanation: "Divide by 2: x + 3 = 7. Subtract 3: x = 4.",
      diagram: { left: "2(x + 3)", right: "14" }
    },
    {
      id: "w6_q2",
      prompt: "Solve for x: 3(x − 2) = 21",
      spoken: "Solve for x: 3 times the bracket x minus 2 equals 21.",
      options: ["x = 8", "x = 9", "x = 7", "x = 10"],
      correctIndex: 1,
      explanation: "Divide by 3: x − 2 = 7. Add 2: x = 9.",
      diagram: { left: "3(x − 2)", right: "21" }
    },
    {
      id: "w6_q3",
      prompt: "Solve for x: 4(x + 5) = 36",
      spoken: "Solve for x: 4 times the bracket x plus 5 equals 36.",
      options: ["x = 3", "x = 5", "x = 4", "x = 6"],
      correctIndex: 2,
      explanation: "Divide by 4: x + 5 = 9. Subtract 5: x = 4.",
      diagram: { left: "4(x + 5)", right: "36" }
    },
    {
      id: "w6_q4",
      prompt: "Solve for x: 5(x − 4) = 30",
      spoken: "Solve for x: 5 times the bracket x minus 4 equals 30.",
      options: ["x = 10", "x = 9", "x = 11", "x = 8"],
      correctIndex: 0,
      explanation: "Divide by 5: x − 4 = 6. Add 4: x = 10.",
      diagram: { left: "5(x − 4)", right: "30" }
    },
    {
      id: "w6_q5",
      prompt: "Solve for x: 3(2x + 1) = 27",
      spoken: "Solve for x: 3 times the bracket 2 x plus 1 equals 27.",
      options: ["x = 3", "x = 4", "x = 5", "x = 2"],
      correctIndex: 1,
      explanation: "Divide by 3: 2x + 1 = 9. Subtract 1: 2x = 8. Divide by 2: x = 4.",
      diagram: { left: "3(2x + 1)", right: "27" }
    },
    {
      id: "w6_q6",
      prompt: "Solve for x: 2(3x − 4) = 22",
      spoken: "Solve for x: 2 times the bracket 3 x minus 4 equals 22.",
      options: ["x = 4", "x = 6", "x = 5", "x = 7"],
      correctIndex: 2,
      explanation: "Divide by 2: 3x − 4 = 11. Add 4: 3x = 15. Divide by 3: x = 5.",
      diagram: { left: "2(3x − 4)", right: "22" }
    },
    {
      id: "w6_q7",
      prompt: "Solve for x: 6(x + 2) = 48",
      spoken: "Solve for x: 6 times the bracket x plus 2 equals 48.",
      options: ["x = 5", "x = 7", "x = 6", "x = 8"],
      correctIndex: 2,
      explanation: "Divide by 6: x + 2 = 8. Subtract 2: x = 6.",
      diagram: { left: "6(x + 2)", right: "48" }
    },
    {
      id: "w6_q8",
      prompt: "Solve for x: 4(2x − 3) = 44",
      spoken: "Solve for x: 4 times the bracket 2 x minus 3 equals 44.",
      options: ["x = 7", "x = 6", "x = 8", "x = 5"],
      correctIndex: 0,
      explanation: "Divide by 4: 2x − 3 = 11. Add 3: 2x = 14. Divide by 2: x = 7.",
      diagram: { left: "4(2x − 3)", right: "44" }
    },
    {
      id: "w6_q9",
      prompt: "Solve for x: 7(x − 1) = 42",
      spoken: "Solve for x: 7 times the bracket x minus 1 equals 42.",
      options: ["x = 6", "x = 7", "x = 8", "x = 5"],
      correctIndex: 1,
      explanation: "Divide by 7: x − 1 = 6. Add 1: x = 7.",
      diagram: { left: "7(x − 1)", right: "42" }
    },
    {
      id: "w6_q10",
      prompt: "Solve for x: 5(2x + 4) = 70",
      spoken: "Solve for x: 5 times the bracket 2 x plus 4 equals 70.",
      options: ["x = 4", "x = 6", "x = 5", "x = 7"],
      correctIndex: 2,
      explanation: "Divide by 5: 2x + 4 = 14. Subtract 4: 2x = 10. Divide by 2: x = 5.",
      diagram: { left: "5(2x + 4)", right: "70" }
    }
  ],

  // --- WORLD 7: Fraction Falls (Fractional Equations) ---
  6: [
    {
      id: "w7_q1",
      prompt: "Solve for x: x / 3 + 4 = 9",
      spoken: "Solve for x: x over 3 plus 4 equals 9.",
      options: ["x = 15", "x = 12", "x = 18", "x = 21"],
      correctIndex: 0,
      explanation: "Subtract 4: x / 3 = 5. Multiply by 3: x = 15.",
      diagram: { left: "x / 3 + 4", right: "9" }
    },
    {
      id: "w7_q2",
      prompt: "Solve for x: x / 2 − 5 = 3",
      spoken: "Solve for x: x over 2 minus 5 equals 3.",
      options: ["x = 14", "x = 16", "x = 15", "x = 18"],
      correctIndex: 1,
      explanation: "Add 5: x / 2 = 8. Multiply by 2: x = 16.",
      diagram: { left: "x / 2 − 5", right: "3" }
    },
    {
      id: "w7_q3",
      prompt: "Solve for x: (x + 6) / 4 = 5",
      spoken: "Solve for x: the fraction x plus 6 over 4 equals 5.",
      options: ["x = 14", "x = 12", "x = 16", "x = 20"],
      correctIndex: 0,
      explanation: "Multiply by 4: x + 6 = 20. Subtract 6: x = 14.",
      diagram: { left: "(x + 6) / 4", right: "5" }
    },
    {
      id: "w7_q4",
      prompt: "Solve for x: x / 5 + 7 = 11",
      spoken: "Solve for x: x over 5 plus 7 equals 11.",
      options: ["x = 25", "x = 15", "x = 20", "x = 18"],
      correctIndex: 2,
      explanation: "Subtract 7: x / 5 = 4. Multiply by 5: x = 20.",
      diagram: { left: "x / 5 + 7", right: "11" }
    },
    {
      id: "w7_q5",
      prompt: "Solve for x: (x − 3) / 5 = 4",
      spoken: "Solve for x: the fraction x minus 3 over 5 equals 4.",
      options: ["x = 20", "x = 23", "x = 22", "x = 25"],
      correctIndex: 1,
      explanation: "Multiply by 5: x − 3 = 20. Add 3: x = 23.",
      diagram: { left: "(x − 3) / 5", right: "4" }
    },
    {
      id: "w7_q6",
      prompt: "Solve for x: x / 4 − 2 = 6",
      spoken: "Solve for x: x over 4 minus 2 equals 6.",
      options: ["x = 32", "x = 28", "x = 30", "x = 36"],
      correctIndex: 0,
      explanation: "Add 2: x / 4 = 8. Multiply by 4: x = 32.",
      diagram: { left: "x / 4 − 2", right: "6" }
    },
    {
      id: "w7_q7",
      prompt: "Solve for x: (2x + 4) / 3 = 6",
      spoken: "Solve for x: the fraction 2 x plus 4 over 3 equals 6.",
      options: ["x = 6", "x = 7", "x = 5", "x = 8"],
      correctIndex: 1,
      explanation: "Multiply by 3: 2x + 4 = 18. Subtract 4: 2x = 14. Divide by 2: x = 7.",
      diagram: { left: "(2x + 4) / 3", right: "6" }
    },
    {
      id: "w7_q8",
      prompt: "Solve for x: x / 6 + 9 = 15",
      spoken: "Solve for x: x over 6 plus 9 equals 15.",
      options: ["x = 30", "x = 36", "x = 42", "x = 24"],
      correctIndex: 1,
      explanation: "Subtract 9: x / 6 = 6. Multiply by 6: x = 36.",
      diagram: { left: "x / 6 + 9", right: "15" }
    },
    {
      id: "w7_q9",
      prompt: "Solve for x: (3x − 6) / 4 = 9",
      spoken: "Solve for x: the fraction 3 x minus 6 over 4 equals 9.",
      options: ["x = 14", "x = 12", "x = 13", "x = 15"],
      correctIndex: 0,
      explanation: "Multiply by 4: 3x − 6 = 36. Add 6: 3x = 42. Divide by 3: x = 14.",
      diagram: { left: "(3x − 6) / 4", right: "9" }
    },
    {
      id: "w7_q10",
      prompt: "Solve for x: x / 7 − 4 = 3",
      spoken: "Solve for x: x over 7 minus 4 equals 3.",
      options: ["x = 42", "x = 56", "x = 49", "x = 35"],
      correctIndex: 2,
      explanation: "Add 4: x / 7 = 7. Multiply by 7: x = 49.",
      diagram: { left: "x / 7 − 4", right: "3" }
    }
  ],

  // --- WORLD 8: Detective Alley (Mistake Inspection & First Steps) ---
  7: [
    {
      id: "w8_q1",
      prompt: "What is the best FIRST step to solve: 3x + 8 = 29?",
      spoken: "What is the best first step to solve 3 x plus 8 equals 29?",
      options: ["Subtract 8 from both sides", "Divide both sides by 3", "Add 8 to both sides", "Multiply both sides by 3"],
      correctIndex: 0,
      explanation: "Undo addition first! Subtract 8 from both sides to get 3x = 21.",
      diagram: { left: "3x + 8", right: "29" }
    },
    {
      id: "w8_q2",
      prompt: "What is the best FIRST step to solve: 4(x − 5) = 28?",
      spoken: "What is the best first step to solve 4 times the bracket x minus 5 equals 28?",
      options: ["Add 5 to both sides", "Divide both sides by 4", "Subtract 28 from both sides", "Multiply both sides by 4"],
      correctIndex: 1,
      explanation: "Divide both sides by 4 to clear the multiplier: x − 5 = 7.",
      diagram: { left: "4(x − 5)", right: "28" }
    },
    {
      id: "w8_q3",
      prompt: "A student writes: 5x − 7 = 18 → 5x = 11. What mistake did they make?",
      spoken: "A student writes 5 x minus 7 equals 18 leads to 5 x equals 11. What mistake did they make?",
      options: ["They subtracted 7 instead of adding 7", "They divided by 5 incorrectly", "They forgot to multiply", "No mistake was made"],
      correctIndex: 0,
      explanation: "To undo −7, you must ADD 7: 18 + 7 = 25, not 18 − 7 = 11.",
      diagram: { left: "5x − 7", right: "18" }
    },
    {
      id: "w8_q4",
      prompt: "What is the best FIRST step to solve: 6x + 5 = 2x + 21?",
      spoken: "What is the best first step to solve 6 x plus 5 equals 2 x plus 21?",
      options: ["Subtract 2x from both sides", "Add 5 to both sides", "Divide both sides by 6", "Add 2x to both sides"],
      correctIndex: 0,
      explanation: "Gather the variable terms on one side by subtracting 2x from both sides: 4x + 5 = 21.",
      diagram: { left: "6x + 5", right: "2x + 21" }
    },
    {
      id: "w8_q5",
      prompt: "Solve and verify: If 2x + 6 = 20, is x = 7 correct?",
      spoken: "Solve and verify: If 2 x plus 6 equals 20, is x equals 7 correct?",
      options: ["Yes, 2(7) + 6 = 20 ✓", "No, x should be 8", "No, x should be 6", "No, x should be 10"],
      correctIndex: 0,
      explanation: "Substitute 7: 2(7) + 6 = 14 + 6 = 20 ✓ Yes, x = 7 is correct!",
      diagram: { left: "2x + 6", right: "20" }
    },
    {
      id: "w8_q6",
      prompt: "What is the best FIRST step to solve: x / 5 + 6 = 10?",
      spoken: "What is the best first step to solve x over 5 plus 6 equals 10?",
      options: ["Subtract 6 from both sides", "Multiply both sides by 5", "Add 6 to both sides", "Divide by 10"],
      correctIndex: 0,
      explanation: "Undo addition first: subtract 6 to get x / 5 = 4, then multiply by 5.",
      diagram: { left: "x / 5 + 6", right: "10" }
    },
    {
      id: "w8_q7",
      prompt: "A student writes: 3x + 12 = 30 → x + 12 = 10. What mistake did they make?",
      spoken: "A student writes 3 x plus 12 equals 30 leads to x plus 12 equals 10. What mistake did they make?",
      options: ["They only divided 3x and 30, forgetting to divide 12 by 3", "They added instead of dividing", "They divided incorrectly", "No mistake was made"],
      correctIndex: 0,
      explanation: "When dividing an equation, EVERY term must be divided: 3x/3 + 12/3 = 30/3 → x + 4 = 10.",
      diagram: { left: "3x + 12", right: "30" }
    },
    {
      id: "w8_q8",
      prompt: "What is the solution to 5x + 3 = 3x + 17?",
      spoken: "What is the solution to 5 x plus 3 equals 3 x plus 17?",
      options: ["x = 7", "x = 8", "x = 6", "x = 9"],
      correctIndex: 0,
      explanation: "Subtract 3x: 2x + 3 = 17. Subtract 3: 2x = 14. Divide by 2: x = 7.",
      diagram: { left: "5x + 3", right: "3x + 17" }
    },
    {
      id: "w8_q9",
      prompt: "Check: Does x = 5 satisfy 4(x + 2) = 28?",
      spoken: "Check: Does x equals 5 satisfy 4 times the bracket x plus 2 equals 28?",
      options: ["Yes, 4(5 + 2) = 4(7) = 28 ✓", "No, left side is 24", "No, left side is 32", "No, x should be 6"],
      correctIndex: 0,
      explanation: "Substitute x = 5: 4(5 + 2) = 4(7) = 28 ✓ Correct!",
      diagram: { left: "4(x + 2)", right: "28" }
    },
    {
      id: "w8_q10",
      prompt: "What is the best FIRST step to solve: (x − 4) / 3 = 6?",
      spoken: "What is the best first step to solve the fraction x minus 4 over 3 equals 6?",
      options: ["Multiply both sides by 3", "Add 4 to both sides", "Divide both sides by 3", "Subtract 6 from both sides"],
      correctIndex: 0,
      explanation: "Multiply both sides by 3 to clear the denominator: x − 4 = 18.",
      diagram: { left: "(x − 4) / 3", right: "6" }
    }
  ],

  // --- WORLD 9: Rocket Rental (Real-World Comparison Word Problems) ---
  8: [
    {
      id: "w9_q1",
      prompt: "Rover Rentals costs $20 base plus $5/hr. Orbit Cars costs $50 base plus $2/hr. When are costs equal? Solve 5x + 20 = 2x + 50.",
      spoken: "Rover Rentals costs 20 dollars base plus 5 dollars per hour. Orbit Cars costs 50 dollars base plus 2 dollars per hour. When are costs equal? Solve 5 x plus 20 equals 2 x plus 50.",
      options: ["x = 10 hours", "x = 12 hours", "x = 8 hours", "x = 15 hours"],
      correctIndex: 0,
      explanation: "Subtract 2x: 3x + 20 = 50. Subtract 20: 3x = 30. Divide by 3: x = 10 hours.",
      diagram: { left: "5x + 20", right: "2x + 50" }
    },
    {
      id: "w9_q2",
      prompt: "Maya saves $40 plus $8 weekly. Alex saves $10 plus $14 weekly. After how many weeks do they have the same amount? Solve 14x + 10 = 8x + 40.",
      spoken: "Maya saves 40 dollars plus 8 dollars weekly. Alex saves 10 dollars plus 14 dollars weekly. After how many weeks do they have the same amount? Solve 14 x plus 10 equals 8 x plus 40.",
      options: ["x = 5 weeks", "x = 6 weeks", "x = 4 weeks", "x = 7 weeks"],
      correctIndex: 0,
      explanation: "Subtract 8x: 6x + 10 = 40. Subtract 10: 6x = 30. Divide by 6: x = 5 weeks.",
      diagram: { left: "14x + 10", right: "8x + 40" }
    },
    {
      id: "w9_q3",
      prompt: "A delivery van charges $15 plus $3 per package. Total bill was $48. Solve 3x + 15 = 48.",
      spoken: "A delivery van charges 15 dollars plus 3 dollars per package. Total bill was 48 dollars. Solve 3 x plus 15 equals 48.",
      options: ["x = 10 packages", "x = 11 packages", "x = 12 packages", "x = 9 packages"],
      correctIndex: 1,
      explanation: "Subtract 15: 3x = 33. Divide by 3: x = 11 packages.",
      diagram: { left: "3x + 15", right: "48" }
    },
    {
      id: "w9_q4",
      prompt: "Gym Plan A: $30 monthly plus $2 per visit. Gym Plan B: $10 monthly plus $6 per visit. When are they equal? Solve 6x + 10 = 2x + 30.",
      spoken: "Gym Plan A is 30 dollars plus 2 dollars per visit. Gym Plan B is 10 dollars plus 6 dollars per visit. When are they equal? Solve 6 x plus 10 equals 2 x plus 30.",
      options: ["x = 5 visits", "x = 4 visits", "x = 6 visits", "x = 8 visits"],
      correctIndex: 0,
      explanation: "Subtract 2x: 4x + 10 = 30. Subtract 10: 4x = 20. Divide by 4: x = 5 visits.",
      diagram: { left: "6x + 10", right: "2x + 30" }
    },
    {
      id: "w9_q5",
      prompt: "A drone rental costs $25 sign-up plus $15 daily. Total cost: $100. Solve 15x + 25 = 100.",
      spoken: "A drone rental costs 25 dollars sign-up plus 15 dollars daily. Total cost is 100 dollars. Solve 15 x plus 25 equals 100.",
      options: ["x = 4 days", "x = 5 days", "x = 6 days", "x = 3 days"],
      correctIndex: 1,
      explanation: "Subtract 25: 15x = 75. Divide by 15: x = 5 days.",
      diagram: { left: "15x + 25", right: "100" }
    },
    {
      id: "w9_q6",
      prompt: "Streaming Plan Alpha: $8 fee + $3/movie. Plan Beta: $20 fee + $1/movie. When are costs equal? Solve 3x + 8 = x + 20.",
      spoken: "Streaming Plan Alpha is 8 dollars plus 3 dollars per movie. Plan Beta is 20 dollars plus 1 dollar per movie. When are costs equal? Solve 3 x plus 8 equals x plus 20.",
      options: ["x = 6 movies", "x = 7 movies", "x = 5 movies", "x = 8 movies"],
      correctIndex: 0,
      explanation: "Subtract x: 2x + 8 = 20. Subtract 8: 2x = 12. Divide by 2: x = 6 movies.",
      diagram: { left: "3x + 8", right: "x + 20" }
    },
    {
      id: "w9_q7",
      prompt: "A taxi ride cost $27. Rate is $3 flag drop plus $4 per km. Solve 4x + 3 = 27.",
      spoken: "A taxi ride cost 27 dollars. Rate is 3 dollars flag drop plus 4 dollars per kilometre. Solve 4 x plus 3 equals 27.",
      options: ["x = 5 km", "x = 6 km", "x = 7 km", "x = 8 km"],
      correctIndex: 1,
      explanation: "Subtract 3: 4x = 24. Divide by 4: x = 6 km.",
      diagram: { left: "4x + 3", right: "27" }
    },
    {
      id: "w9_q8",
      prompt: "Two catering companies cost the same when 7x + 50 = 3x + 130. How many guests? Solve for x.",
      spoken: "Two catering companies cost the same when 7 x plus 50 equals 3 x plus 130. How many guests? Solve for x.",
      options: ["x = 18 guests", "x = 20 guests", "x = 22 guests", "x = 15 guests"],
      correctIndex: 1,
      explanation: "Subtract 3x: 4x + 50 = 130. Subtract 50: 4x = 80. Divide by 4: x = 20 guests.",
      diagram: { left: "7x + 50", right: "3x + 130" }
    },
    {
      id: "w9_q9",
      prompt: "Maya's baking club ordered 3 bags of flour and $6 of spices for $33 total. Solve 3x + 6 = 33.",
      spoken: "Maya's baking club ordered 3 bags of flour and 6 dollars of spices for 33 dollars total. Solve 3 x plus 6 equals 33.",
      options: ["x = $8", "x = $9", "x = $10", "x = $7"],
      correctIndex: 1,
      explanation: "Subtract 6: 3x = 27. Divide by 3: x = $9 per bag of flour.",
      diagram: { left: "3x + 6", right: "33" }
    },
    {
      id: "w9_q10",
      prompt: "Bowling Alley 1: $15 shoe rental + $4/game. Bowling Alley 2: $5 shoe rental + $6/game. Solve 6x + 5 = 4x + 15.",
      spoken: "Bowling Alley 1 is 15 dollars shoes plus 4 dollars per game. Bowling Alley 2 is 5 dollars shoes plus 6 dollars per game. Solve 6 x plus 5 equals 4 x plus 15.",
      options: ["x = 5 games", "x = 6 games", "x = 4 games", "x = 7 games"],
      correctIndex: 0,
      explanation: "Subtract 4x: 2x + 5 = 15. Subtract 5: 2x = 10. Divide by 2: x = 5 games.",
      diagram: { left: "6x + 5", right: "4x + 15" }
    }
  ],

  // --- WORLD 10: Equation Citadel (Mastery Grand Challenge) ---
  9: [
    {
      id: "w10_q1",
      prompt: "Solve for x: 3(2x − 4) = 4x + 6",
      spoken: "Solve for x: 3 times the bracket 2 x minus 4 equals 4 x plus 6.",
      options: ["x = 9", "x = 8", "x = 10", "x = 7"],
      correctIndex: 0,
      explanation: "Expand bracket: 6x − 12 = 4x + 6. Subtract 4x: 2x − 12 = 6. Add 12: 2x = 18. Divide by 2: x = 9.",
      diagram: { left: "3(2x − 4)", right: "4x + 6" }
    },
    {
      id: "w10_q2",
      prompt: "Solve for x: 4(x + 2) = 2(x + 9)",
      spoken: "Solve for x: 4 times the bracket x plus 2 equals 2 times the bracket x plus 9.",
      options: ["x = 5", "x = 6", "x = 4", "x = 7"],
      correctIndex: 0,
      explanation: "Expand: 4x + 8 = 2x + 18. Subtract 2x: 2x + 8 = 18. Subtract 8: 2x = 10. Divide by 2: x = 5.",
      diagram: { left: "4(x + 2)", right: "2(x + 9)" }
    },
    {
      id: "w10_q3",
      prompt: "Solve for x: 5(x − 1) = 3(x + 5)",
      spoken: "Solve for x: 5 times the bracket x minus 1 equals 3 times the bracket x plus 5.",
      options: ["x = 9", "x = 10", "x = 8", "x = 11"],
      correctIndex: 1,
      explanation: "Expand: 5x − 5 = 3x + 15. Subtract 3x: 2x − 5 = 15. Add 5: 2x = 20. Divide by 2: x = 10.",
      diagram: { left: "5(x − 1)", right: "3(x + 5)" }
    },
    {
      id: "w10_q4",
      prompt: "Solve for x: (3x + 6) / 2 = 12",
      spoken: "Solve for x: the fraction 3 x plus 6 over 2 equals 12.",
      options: ["x = 6", "x = 7", "x = 5", "x = 8"],
      correctIndex: 0,
      explanation: "Multiply by 2: 3x + 6 = 24. Subtract 6: 3x = 18. Divide by 3: x = 6.",
      diagram: { left: "(3x + 6) / 2", right: "12" }
    },
    {
      id: "w10_q5",
      prompt: "Solve for x: 2(4x + 3) = 6x + 16",
      spoken: "Solve for x: 2 times the bracket 4 x plus 3 equals 6 x plus 16.",
      options: ["x = 4", "x = 5", "x = 6", "x = 3"],
      correctIndex: 1,
      explanation: "Expand: 8x + 6 = 6x + 16. Subtract 6x: 2x + 6 = 16. Subtract 6: 2x = 10. Divide by 2: x = 5.",
      diagram: { left: "2(4x + 3)", right: "6x + 16" }
    },
    {
      id: "w10_q6",
      prompt: "Solve for x: (4x − 8) / 3 = 8",
      spoken: "Solve for x: the fraction 4 x minus 8 over 3 equals 8.",
      options: ["x = 7", "x = 8", "x = 6", "x = 9"],
      correctIndex: 1,
      explanation: "Multiply by 3: 4x − 8 = 24. Add 8: 4x = 32. Divide by 4: x = 8.",
      diagram: { left: "(4x − 8) / 3", right: "8" }
    },
    {
      id: "w10_q7",
      prompt: "Solve for x: 6(x − 2) = 2(2x + 4)",
      spoken: "Solve for x: 6 times the bracket x minus 2 equals 2 times the bracket 2 x plus 4.",
      options: ["x = 9", "x = 10", "x = 8", "x = 11"],
      correctIndex: 1,
      explanation: "Expand: 6x − 12 = 4x + 8. Subtract 4x: 2x − 12 = 8. Add 12: 2x = 20. Divide by 2: x = 10.",
      diagram: { left: "6(x − 2)", right: "2(2x + 4)" }
    },
    {
      id: "w10_q8",
      prompt: "Solve for x: 7(x + 1) = 3(2x + 5)",
      spoken: "Solve for x: 7 times the bracket x plus 1 equals 3 times the bracket 2 x plus 5.",
      options: ["x = 7", "x = 8", "x = 6", "x = 9"],
      correctIndex: 1,
      explanation: "Expand: 7x + 7 = 6x + 15. Subtract 6x: x + 7 = 15. Subtract 7: x = 8.",
      diagram: { left: "7(x + 1)", right: "3(2x + 5)" }
    },
    {
      id: "w10_q9",
      prompt: "Solve for x: (5x + 10) / 4 = 15",
      spoken: "Solve for x: the fraction 5 x plus 10 over 4 equals 15.",
      options: ["x = 10", "x = 11", "x = 9", "x = 12"],
      correctIndex: 0,
      explanation: "Multiply by 4: 5x + 10 = 60. Subtract 10: 5x = 50. Divide by 5: x = 10.",
      diagram: { left: "(5x + 10) / 4", right: "15" }
    },
    {
      id: "w10_q10",
      prompt: "Solve for x: 3(3x − 5) = 2(3x + 6)",
      spoken: "Solve for x: 3 times the bracket 3 x minus 5 equals 2 times the bracket 3 x plus 6.",
      options: ["x = 8", "x = 9", "x = 7", "x = 10"],
      correctIndex: 1,
      explanation: "Expand: 9x − 15 = 6x + 12. Subtract 6x: 3x − 15 = 12. Add 15: 3x = 27. Divide by 3: x = 9.",
      diagram: { left: "3(3x − 5)", right: "2(3x + 6)" }
    }
  ]
};
