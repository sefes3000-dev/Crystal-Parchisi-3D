/**
 * ============================================================
 * Crystal Parchisi 3D
 * Board Data
 * ============================================================
 */

const BoardData = {

    MAIN_PATH_LENGTH: 68,

    HOME_PATH_LENGTH: 7,

    PAWNS_PER_PLAYER: 4,

    PLAYERS: [
        "RED",
        "YELLOW",
        "GREEN",
        "BLUE"
    ],

    START_INDEX: {
        RED: 0,
        YELLOW: 17,
        GREEN: 34,
        BLUE: 51
    },

    HOME_ENTRY: {
        RED: 67,
        YELLOW: 16,
        GREEN: 33,
        BLUE: 50
    },

    SAFE_TILES: [
        0,8,13,21,26,34,39,47
    ],

    SPAWN: {
        RED: 0,
        YELLOW: 17,
        GREEN: 34,
        BLUE: 51
    },

    COLORS: {
        RED: 0xff4444,
        YELLOW: 0xffdd33,
        GREEN: 0x33cc55,
        BLUE: 0x3399ff
    },

    HOME_POSITIONS: {
        RED: [],
        YELLOW: [],
        GREEN: [],
        BLUE: []
    },

    PATH: []

};

export default BoardData;
