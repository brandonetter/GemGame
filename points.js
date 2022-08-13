class Points {
  static totalPoints = 0;
  static calcPoints() {
    let emptyCount = GameState.getListOfEmptyObs().length;
    let bonus = (() => {
      switch (true) {
        case emptyCount <= 3:
          return 0;
        case emptyCount <= 6:
          return 10;
        case emptyCount <= 12:
          return 20;

        case emptyCount <= 15:
          return 40;

        case emptyCount <= 18:
          return 100;

        case emptyCount > 19:
          return 200;
      }
    })();
    Points.totalPoints += emptyCount + bonus;
  }
  static async collectPoints(start, ourList = GameState.getListOfObsDone()) {
    await new Promise((r) => setTimeout(r, 50));
    ourList = [...ourList].filter((v) => v.type === "done");

    for (let i of ourList) {
      if (i.x === start.upNode()[0] && i.y === start.upNode()[1]) {
        i.type = "collected";
        i.material.color = COLORS.selected;
        soundCollect.play();
        await Points.collectPoints(i, ourList);
      } else if (i.x === start.leftNode()[0] && i.y === start.leftNode()[1]) {
        i.type = "collected";
        i.material.color = COLORS.selected;
        soundCollect.play();
        await Points.collectPoints(i, ourList);
      } else if (i.x === start.rightNode()[0] && i.y === start.rightNode()[1]) {
        i.type = "collected";
        i.material.color = COLORS.selected;
        soundCollect.play();
        await Points.collectPoints(i, ourList);
      } else if (i.x === start.downNode()[0] && i.y === start.downNode()[1]) {
        i.type = "collected";
        i.material.color = COLORS.selected;
        soundCollect.play();
        await Points.collectPoints(i, ourList);
      }
    }

    GameState.selectedObjects = [];
    GameState.checkPoints = [];
  }
}
