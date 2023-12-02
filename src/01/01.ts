
export function parse(input: string) {
  return input
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.replace(/[^\d\n]/g, "").split("\n").reduce((acc, curr) => 
    acc + (Number.parseInt(`${curr[0]}${curr.at(-1)}`) || 0), 0
  )
}

export function partTwo(input: ReturnType<typeof parse>) {
  const digits = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
  ];
  const groups = digits.map(w => `(${w})`).join("|");
  const pattern = new RegExp(`(?=${groups})`, "g");

  return partOne(
    input.replace(pattern, (...args) => 
      `${digits.indexOf(args.slice(0, -2).join("")) + 1}`
    )
  );
}