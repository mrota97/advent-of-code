type CubeColors = "red" | "green" | "blue";
type GameSetEntry = [CubeColors, number];
type Game = { id: number, sets: string[] };

export function parse(input: string) {
  return input
}

const getLines = (input: string) => input.split("\n");

export function partOne(input: ReturnType<typeof parse>) {
    let sum = 0;

    forEachGame(input, (game) => {
        const inventory = { red: 12, green: 13, blue: 14 };

        let isValid = true;
        for (const set of game.sets) {
            if (!isValid) continue;
            isValid = toEntries(set).reduce<boolean>((isValid, [color, amt]) => 
                isValid && (amt <= inventory[color]), isValid
            );
        }

        if (isValid) sum += game.id;
    })

    return sum;
}

/**
 * 1. for each game, find the smallest amount of inventory needed to make the game valid
 * 2. multiply the contents of the bag together, getting the power of the set of cubes
 * 3. sum all of the powers together
 */
export function partTwo(input: ReturnType<typeof parse>) {
    let sum = 0;
    forEachGame(input, (game) => {
        const inv = { red: 0, green: 0, blue: 0 };
        for (const [color, amt] of game.sets.map(toEntries).flat()) {
            inv[color] = Math.max(inv[color], amt);
        }

        sum += Object.values(inv).reduce((acc, curr) => acc * curr);
    })
    return sum;    
}

// santa's little helpers

function parseGame(game: string): Game | undefined {
    const [gameId, ...sets] = game.split(/:|;/);
    const id = Number.parseInt(gameId?.replace(/[^\d]/g, "") ?? "NaN", 10);
    if (Number.isNaN(id)) return;
    return { id, sets };
};

function toEntries(set: string): GameSetEntry[] {
    const gameSet = set.trimStart().split(", ");
    function getEntry(str: string): GameSetEntry {
        const [key, value] = str.split(" ").reverse() as [CubeColors, string];
        if (!key || !value) throw new Error("invalid entry");
        
        return [key, Number.parseInt(value)];
    }

    return gameSet.map(getEntry);
}

function forEachGame(input: ReturnType<typeof parse>, callback: (game: Game) => void) {
    for (const line of getLines(input)) {
        const game = parseGame(line);
        if (!game) continue;
        callback(game);
    }
}