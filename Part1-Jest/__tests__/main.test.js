const formatVolumeIconPath = require("../assets/scripts/main");

describe("my sound level", () => {
    test("is greater than 66", () => {
        expect(formatVolumeIconPath(80)).toBe(`./assets/media/icons/volume-level-3.svg`);
    });

    test("is greater than 33 and less than 67", () => {
        expect(formatVolumeIconPath(50)).toBe(`./assets/media/icons/volume-level-2.svg`);
    });

    test("is greater than 0 and less than 34", () => {
        expect(formatVolumeIconPath(20)).toBe(`./assets/media/icons/volume-level-1.svg`);
    });

    test("is 0", () => {
        expect(formatVolumeIconPath(0)).toBe(`./assets/media/icons/volume-level-0.svg`);
    });

    /** using .toContain() */
    test("is greater than 66", () => {
        expect(formatVolumeIconPath(80)).toContain("3");
    });

    test("is greater than 33 and less than 67", () => {
        expect(formatVolumeIconPath(50)).toContain("2");
    });

    test("is greater than 0 and less than 34", () => {
        expect(formatVolumeIconPath(20)).toContain("1");
    });

    test("is 0", () => {
        expect(formatVolumeIconPath(0)).toContain("0");
    });
});
