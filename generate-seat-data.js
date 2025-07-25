const fs = require("fs");

const rowIds = [
  "68824898be9e39d8a07021fe",
  "68824898be9e39d8a07021ff",
  "68824898be9e39d8a0702200",
  "68824898be9e39d8a0702201",
  "68824898be9e39d8a0702202",
  "68824898be9e39d8a0702203",
  "68824898be9e39d8a0702204",
  "68824898be9e39d8a0702205",
  "68824898be9e39d8a0702206",
  "68824898be9e39d8a0702207",
  "68824898be9e39d8a0702208",
  "68824898be9e39d8a0702209",
  "68824898be9e39d8a070220a",
  "68824898be9e39d8a070220b",
  "68824898be9e39d8a070220c",
  "68824898be9e39d8a070220d",
  "68824898be9e39d8a070220e",
  "68824898be9e39d8a070220f",
  "68824898be9e39d8a0702210",
  "68824898be9e39d8a0702211",
  "68824898be9e39d8a0702212",
  "68824898be9e39d8a0702213",
  "68824898be9e39d8a0702214",
  "68824898be9e39d8a0702215",
  "68824898be9e39d8a0702216",
  "68824898be9e39d8a0702217",
];

// Loại ghế theo index
function getType(index) {
  if (index < 7) return "vip";
  if (index < 20) return "standard";
  return "balconny";
}

const seats = [];

rowIds.forEach((rowId, rowIndex) => {
  const type = getType(rowIndex);
  for (let number = 1; number <= 20; number++) {
    seats.push({
      number,
      type,
      isActive: true,
      rowId,
    });
  }
});

fs.writeFileSync("data/seat.data.json", JSON.stringify(seats, null, 2));
console.log(`Generated ${seats.length} seats`);
