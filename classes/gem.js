class Gem {
  static initGems() {}
  static generateGem(...positionInfo) {
    let typeOfGem = Math.floor(Math.random() * 3);
    let gem = GameState.gems[typeOfGem];

    let mesh = gem.children[1].clone();
    mesh.type = typeOfGem;
    mesh.material = gem.children[1].material.clone();
    mesh.material.emissiveIntensity = 0.2;
    mesh.scale.x = 0.1;
    mesh.scale.y = 0.1;
    mesh.scale.z = 0.1;

    mesh.selected = false;

    if (positionInfo.length === 1) {
      mesh.x = positionInfo[0].x;
      mesh.y = positionInfo[0].y;
      mesh.position.x = positionInfo[0].position.x;
      mesh.position.y = positionInfo[0].position.y;
    }
    if (positionInfo.length === 2) {
      mesh.translateX(positionInfo[0] * 35);
      mesh.translateY(positionInfo[1] * 35);
      mesh.x = positionInfo[0] + 5;
      mesh.y = positionInfo[1] + 5;
    }
    mesh.upNode = function () {
      return [this.x, this.y + 1];
    };
    mesh.downNode = function () {
      return [this.x, this.y - 1];
    };
    mesh.leftNode = function () {
      return [this.x - 1, this.y];
    };
    mesh.rightNode = function () {
      return [this.x + 1, this.y];
    };
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.y = Math.random();

    mesh.callback = async function () {
      if (this.type === "done") {
        if (GameState.lockScreen) return;
        soundSelect.play();

        setTimeout(() => (this.type = "collected"), 1600);
        await Points.collectPoints(this);
        Points.calcPoints();
        document.getElementById(
          "points"
        ).innerHTML = `Points: <span class='pointsNumber'>${Points.totalPoints}</span>`;
        GameState.lockScreen = true;
        generateNewGems();
      } else if (this.type === "collected") {
        //todo
      } else {
        this.selected = true;
        soundPing.play();
      }
    };
    if (positionInfo.length === 1) {
      GameState.listOfObs.splice(
        GameState.listOfObs.indexOf(positionInfo[0]),
        1
      );
      GameState.listOfObs.push(mesh);
    }
    if (positionInfo.length === 2) {
      GameState.listOfObs.push(mesh);
    }
    return mesh;
  }
}
