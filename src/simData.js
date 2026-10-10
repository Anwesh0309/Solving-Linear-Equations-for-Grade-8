/* =========================================================================
   SIMULATION DATA — 3 stations x 3 activities
   Station 1  Balance Scale  : explore why both sides must stay equal
   Station 2  Undo Lab       : reverse, sort and debug solution steps
   Station 3  Solo Solver    : solve real problems alone & verify
   ========================================================================= */
export const STATIONS = [
  { id: 1, icon: "⚖️", name: "Station 1: Balance Scale", sub: "Keep both sides equal",
    intro: "Welcome to the Balance Scale station! Here you will see why both sides must always stay equal." },
  { id: 2, icon: "🛠️", name: "Station 2: Undo Lab", sub: "Reverse, sort & debug",
    intro: "Welcome to the Undo Lab! Practice reversing steps, putting them in order, and catching mistakes." },
  { id: 3, icon: "🧩", name: "Station 3: Solo Solver", sub: "Solve & verify alone",
    intro: "Welcome to the Solo Solver! Now it's your turn to solve real problems on your own." }
];

export const STATION_ACTIVITIES = {
  1: [
    {
      id: 1, type: "balance", icon: "🍎",
      title: "Activity 1: Market Bakery Crate (Mystery Box Scale)",
      realWorld: {
        context: "Artisan Farmer's Market & Bakery",
        propName: "Sealed Wooden Crate",
        unitName: "Fresh Apples",
        itemIcon: "🍎",
        xIcon: "📦",
        ledgerNote: "1 Crate + 3 Apples = 11 Apples"
      },
      desc: "Maya's scale balances a mystery box plus 3 cubes against 11 cubes. Pick a move, apply it to BOTH sides, and reveal the weight of the box!",
      spoken: "Maya's scale balances a mystery box plus 3 cubes against 11 cubes. Pick a move, apply it to both sides, and reveal the weight of the box!",
      start: { L: { x: 1, n: 3 }, R: { x: 0, n: 11 } }, xVal: 8, best: 1,
      ops: [
        { kind: "add", n: -3 }, { kind: "add", n: -1 }, { kind: "add", n: 3 }, { kind: "add", n: -8 }
      ],
      hint: "The 3 cubes are ADDED to the box. Which move undoes adding 3?",
      grade7Tip: "Think of x as a mystery wooden crate of apples. If there are 3 loose apples with the crate balancing 11 apples on the other pan, take 3 apples away from BOTH sides to isolate the crate: x = 8!"
    },
    {
      id: 2, type: "balance", icon: "🎒",
      title: "Activity 2: School Stationery Sacks (Three Equal Bags)",
      realWorld: {
        context: "School Math Supply Depot",
        propName: "Supply Sacks",
        unitName: "Pencil Packs",
        itemIcon: "✏️",
        xIcon: "🎒",
        ledgerNote: "3 Equal Sacks = 15 Pencil Packs"
      },
      desc: "Three identical bags balance 15 cubes. Choose a move that keeps the scale balanced and reveals what ONE bag weighs!",
      spoken: "Three identical bags balance 15 cubes. Choose a move that keeps the scale balanced and reveals what one bag weighs!",
      start: { L: { x: 3, n: 0 }, R: { x: 0, n: 15 } }, xVal: 5, best: 1,
      ops: [
        { kind: "div", k: 5 }, { kind: "add", n: -3 }, { kind: "div", k: 3 }, { kind: "mul", k: 3 }
      ],
      hint: "The bags are MULTIPLIED by 3. Share everything into 3 equal groups!",
      grade7Tip: "3 identical bags weigh 15 total. Share the 15 weights into 3 equal groups by dividing BOTH sides by 3: each bag weighs x = 5!"
    },
    {
      id: 3, type: "balance", icon: "🍊",
      title: "Activity 3: Fruit Stall Gift Baskets (Two-Step Tower)",
      realWorld: {
        context: "Maya's Organic Citrus Stall",
        propName: "Fruit Baskets",
        unitName: "Sweet Oranges",
        itemIcon: "🍊",
        xIcon: "🧺",
        ledgerNote: "2 Baskets + 3 Oranges = 11 Oranges"
      },
      desc: "Two bags and 3 cubes balance 11 cubes. Order matters here: which move should you make first, and which second?",
      spoken: "Two bags and 3 cubes balance 11 cubes. Order matters here: which move should you make first, and which second?",
      start: { L: { x: 2, n: 3 }, R: { x: 0, n: 11 } }, xVal: 4, best: 2,
      ops: [
        { kind: "div", k: 2 }, { kind: "add", n: -3 }, { kind: "add", n: 3 }, { kind: "mul", k: 2 }
      ],
      hint: "Remove the loose cubes first (undo + or −), then split the bags (undo × or ÷).",
      grade7Tip: "Step 1: Remove the 3 loose oranges from both sides (subtract 3) → 2 baskets = 8 oranges. Step 2: Split in half (divide by 2) → each basket has x = 4 oranges!"
    }
  ],
  2: [
    {
      id: 1, type: "machine", icon: "⚙️",
      title: "Activity 1: Arcade Vending Kiosk (Reverse the Machine)",
      realWorld: {
        context: "Retro Arcade Snack & Coin Machine",
        machineName: "Token Dispenser X-300",
        receiptLabel: "Receipt #4029"
      },
      desc: "A number machine multiplies x by 3, then adds 2, and prints 20. Run it backwards: tap the undo buttons in the right order to find the starting number!",
      spoken: "A number machine multiplies x by 3, then adds 2, and prints 20. Run it backwards: tap the undo buttons in the right order to find the starting number!",
      output: 20, answer: 6,
      stages: [ { op: "mul", v: 3 }, { op: "add", v: 2 } ],
      hint: "Undo the LAST stage first. The inverse of + is −, and the inverse of × is ÷.",
      grade7Tip: "Work backwards like rewinding a video! The machine ended by adding 2 to make 20. Undo that first: 20 − 2 = 18. Then undo multiplying by 3: 18 ÷ 3 = 6!"
    },
    {
      id: 2, type: "sorter", icon: "📦",
      title: "Activity 2: Gift Unboxing Protocol (Step Sorter)",
      realWorld: {
        context: "Maya's Birthday Parcel Unboxing",
        parcelId: "TRACK #4X-6",
        metaphor: "Ribbon first (+6), then box (÷4)"
      },
      desc: "Solve 4x − 6 = 18 by tapping the solution cards in the correct order. Watch out for the trick card!",
      spoken: "Solve 4 x minus 6 equals 18 by tapping the solution cards in the correct order. Watch out for the trick card!",
      cards: [
        { id: "a", text: "Start:  4x − 6 = 18", line: "4x − 6 = 18", desc: "Original Parcel Equation" },
        { id: "b", text: "Add 6 to both sides", line: "4x = 24", desc: "Untie −6 tape by adding 6" },
        { id: "c", text: "Divide both sides by 4", line: "x = 6", desc: "Open 4 flaps by dividing 4" },
        { id: "d", text: "Check: 4(6) − 6 = 18 ✓", line: "4(6) − 6 = 18  ✓", desc: "Verify inside contents match" },
        { id: "t", text: "Subtract 6 from both sides", line: "", trap: "Subtracting 6 would make −12 instead of 0! To undo −6, you must ADD 6 to both sides!" }
      ],
      order: ["a", "b", "c", "d"],
      hint: "Start with the original equation. Undo the − 6 before undoing the × 4.",
      grade7Tip: "Remember the gift unboxing rule from Story Slide 6: Ribbon first (+6 to both sides), then open the box (divide by 4)!"
    },
    {
      id: 3, type: "detective", icon: "🕵️",
      title: "Activity 3: Cafe Receipt Auditor (Mistake Detective)",
      realWorld: {
        context: "Math Club Cafe Invoice Audit",
        invoiceNo: "RECEIPT #8812",
        cashier: "Student Cashier"
      },
      desc: "A student solved 2x + 6 = 14, but one line has a mistake. Tap the faulty line, then choose how to fix it!",
      spoken: "A student solved 2 x plus 6 equals 14, but one line has a mistake. Tap the faulty line, then choose how to fix it!",
      lines: [
        { eq: "2x + 6 = 14", note: "Original Bill" },
        { eq: "2x = 14 + 6", note: "Step 1 (Audit Here!)" },
        { eq: "2x = 20", note: "Step 2" },
        { eq: "x = 10", note: "Final Total" }
      ],
      wrongLine: 1,
      fixes: [
        { text: "Subtract 6 from both sides, so 2x = 14 − 6", ok: true },
        { text: "Add 6 to the left side only", ok: false },
        { text: "Divide the 6 by 2 first", ok: false }
      ],
      fixedLines: ["2x + 6 = 14", "2x = 14 − 6", "2x = 8", "x = 4"],
      hint: "What is the inverse of + 6? Do it to BOTH sides.",
      grade7Tip: "In line 1, the student added 6 to the right side, but +6 on the left should be undone by SUBTRACTING 6 from both sides: 14 − 6 = 8, so x = 4!"
    }
  ],
  3: [
    {
      id: 1, type: "taxi", icon: "🚕",
      title: "Activity 1: Metro City Taxi Ride (Taxi Fare Mystery)",
      realWorld: {
        context: "Downtown Yellow Cab Ride",
        baseFare: 3,
        ratePerKm: 2,
        totalMeter: 15,
        receiptNumber: "CAB-NYC-774"
      },
      desc: "A taxi charges $3 to start plus $2 for every kilometre. Maya paid $15 in total. How many kilometres did she ride? Solve 2x + 3 = 15.",
      spoken: "A taxi charges 3 dollars to start plus 2 dollars for every kilometre. Maya paid 15 dollars in total. How many kilometres did she ride? Solve 2 x plus 3 equals 15.",
      ask: "x (km)", target: 6, unit: "km",
      lhs: { a: 2, b: 3, label: "2x + 3" }, rhs: { a: 0, b: 15, label: "15" },
      steps: ["2x + 3 = 15", "2x = 12", "x = 6"],
      hint: "Subtract 3 from both sides, then divide both sides by 2.",
      grade7Tip: "Maya paid $15 total. Subtract the $3 base start fare → $12 spent on driving distance. Since each km costs $2, divide $12 by $2 to get x = 6 km!"
    },
    {
      id: 2, type: "plans", icon: "🏋️",
      title: "Activity 2: FitZone vs PowerGym (Gym Plan Showdown)",
      realWorld: {
        context: "Membership Cost Comparison Kiosk",
        planAName: "FitZone Pass",
        planBName: "PowerGym Silver",
        breakEven: 5
      },
      desc: "Plan A costs $5 plus $4 per visit. Plan B costs $15 plus $2 per visit. After how many visits do both plans cost the same? Solve 4x + 5 = 2x + 15.",
      spoken: "Plan A costs 5 dollars plus 4 dollars per visit. Plan B costs 15 dollars plus 2 dollars per visit. After how many visits do both plans cost the same? Solve 4 x plus 5 equals 2 x plus 15.",
      ask: "x (visits)", target: 5, unit: "visits",
      lhs: { a: 4, b: 5, label: "4x + 5" }, rhs: { a: 2, b: 15, label: "2x + 15" },
      steps: ["4x + 5 = 2x + 15", "2x + 5 = 15", "2x = 10", "x = 5"],
      hint: "Subtract 2x from both sides first to gather the x-terms, then solve like a two-step equation.",
      grade7Tip: "Gather x on one side: subtract 2x from both sides to get 2x + 5 = 15. Subtract 5 to get 2x = 10, then divide by 2: at x = 5 visits, both gyms cost exactly $25!"
    },
    {
      id: 3, type: "chest", icon: "🗝️",
      title: "Activity 3: Ancient Expedition Vault (Treasure Chest Lock)",
      realWorld: {
        context: "Temple Expedition Cipher Lock",
        lockType: "3 Mechanical Vault Tumblers",
        totalGems: 21
      },
      desc: "The chest opens with the code x that solves 3(x − 2) = 21. Find the code to unlock the treasure!",
      spoken: "The chest opens with the code x that solves 3 times the bracket x minus 2 equals 21. Find the code to unlock the treasure!",
      ask: "x (code)", target: 9, unit: "",
      lhs: { a: 3, b: -6, label: "3(x − 2)" }, rhs: { a: 0, b: 21, label: "21" },
      steps: ["3(x − 2) = 21", "x − 2 = 7", "x = 9"],
      hint: "Divide both sides by 3 first, or expand the bracket to 3x − 6 and solve.",
      grade7Tip: "Two ways to solve! Method 1: Divide both sides by 3 first: x − 2 = 7, so x = 9. Method 2: Expand bracket: 3x − 6 = 21, add 6 to get 3x = 27, so x = 9!"
    }
  ]
};

/* Feedback lines (pre-generated so they play instantly) */
export const SIM_SUCCESS = {
  1: "Awesome! You solved it and kept the scale balanced!",
  2: "Brilliant! You undid every step perfectly!",
  3: "Outstanding! Your answer checks out!"
};
export const SIM_RETRY = "Not quite. Check your steps and try again!";
export const PRACTICE_CORRECT = [
  "Correct! Great equation solving!",
  "Yes! You kept it balanced!",
  "Brilliant work!"
];
export const PRACTICE_INCORRECT = [
  "Not quite. Let's learn from it!",
  "Good try. Check the steps and keep going!",
  "Almost! Every mistake helps us learn."
];
export const OUT_OF_HEARTS = "Out of hearts! No worries, let's practice some more and try again!";
export const REFLECT_DONE = "Outstanding reflection! Lesson complete!";
