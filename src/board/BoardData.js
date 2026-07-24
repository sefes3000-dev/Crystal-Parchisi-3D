/**
 * ============================================================
 * Crystal Parchisi 3D
 * Board Data
 * ============================================================
 */

const BoardData = {

    // عدد الخانات الرئيسية
    MAIN_PATH_LENGTH: 68,

    // طول ممر النهاية لكل لاعب
    HOME_PATH_LENGTH: 7,

    // عدد القطع
    PAWNS_PER_PLAYER: 4,

    // اللاعبون
    PLAYERS: [
        "RED",
        "YELLOW",
        "GREEN",
        "BLUE"
    ],

    // نقطة بداية كل لاعب على المسار الرئيسي
    START_INDEX: {
        RED: 0,
        YELLOW: 17,
        GREEN: 34,
        BLUE: 51
    },

    // خانة دخول كل لاعب إلى ممر النهاية
    HOME_ENTRY: {
        RED: 67,
        YELLOW: 16,
        GREEN: 33,
        BLUE: 50
    },

    // الخانات الآمنة
    SAFE_TILES: [
        0,
        8,
        13,
        21,
        26,
        34,
        39,
        47
    ],

    // مراكز خروج القطع
    SPAWN: {
        RED: 0,
        YELLOW: 17,
        GREEN: 34,
        BLUE: 51
    }

};

export default BoardData;
