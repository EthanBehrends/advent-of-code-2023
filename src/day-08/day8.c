#include <stdio.h>
#include <string.h>

struct LetterMap {
    char start[4];
    char left[4];
    char right[4];
};

int partTwo(const char* instructions, struct LetterMap* letterMap, int mapSize) {
    int steps = 0;
    char current[] = "AAA";
    char currentNodes[1000]; // Assuming a maximum of 1000 nodes, adjust as needed
    int node_count = 0;

    for (int i = 0; i < mapSize; i++) {
        if (letterMap[i].start[0] == 'A') {
            currentNodes[node_count] = letterMap[i].start[0];
            node_count++;
        }
    }

    int index = 0;
    int total = 0;

    while (1) {
        if (node_count > 0 && currentNodes[node_count - 1] == 'Z') break;

        char next = instructions[index];

        for (int i = 0; i < node_count; i++) {
            char* node = currentNodes + i;
            struct LetterMap* here;

            for (int j = 0; j < mapSize; j++) {
                if (letterMap[j].start[0] == *node) {
                    here = &letterMap[j];
                    break;
                }
            }

            if (next == 'L') {
                *node = here->left[0];
            } else {
                *node = here->right[0];
            }
        }

        steps++;
        index++;
        total++;

        if (index >= strlen(instructions)) index = 0;
    }

    return steps;
}

int main() {
    char instructions[1000]; // Assuming a maximum of 1000 characters, adjust as needed
    struct LetterMap letterMap[1000]; // Assuming a maximum of 1000 entries, adjust as needed
    int mapSize = 0;

    // Read instructions from stdin
    if (fgets(instructions, sizeof(instructions), stdin) == NULL) {
        perror("Failed to read instructions");
        return 1;
    }

    // Read letter map from stdin
    while (mapSize < sizeof(letterMap) / sizeof(letterMap[0]) && scanf("%3s = (%3s, %3s)", letterMap[mapSize].start, letterMap[mapSize].left, letterMap[mapSize].right) == 3) {
        mapSize++;
    }

    int result = partTwo(instructions, letterMap, mapSize);
    printf("Steps: %d\n", result);
    return 0;
}