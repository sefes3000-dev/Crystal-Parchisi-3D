/**
 * ============================================================
 * Crystal Parchisi 3D
 * Official Game Rules
 * ============================================================
 */

const GameRules = {

    // عدد اللاعبين
    MAX_PLAYERS: 4,

    // عدد القطع لكل لاعب
    PAWNS_PER_PLAYER: 4,

    // عدد مربعات المسار
    BOARD_TILES: 68,

    // طول ممر النهاية
    HOME_PATH_LENGTH: 7,

    // مدة الدور
    TURN_TIME: 30,

    // ========= قواعد الخروج =========

    // يسمح بالخروج عند ظهور 5
    ENTRY_ON_FIVE: true,

    // يسمح بالخروج عند مجموع 5
    ENTRY_ON_SUM_FIVE: true,

    // مهم جداً
    // false = الخروج اختياري
    // true = الخروج إجباري
    FORCE_ENTRY: false,

    // ========= المكافآت =========

    CAPTURE_BONUS: 20,

    HOME_BONUS: 10,

    // ========= الحواجز =========

    ENABLE_BLOCKADE: true,

    // ========= المربعات الآمنة =========

    ENABLE_SAFE_TILES: true,

    SAFE_TILES: [

        0,
        8,
        13,
        21,
        26,
        34,
        39,
        47

    ]

};

export default GameRules;
