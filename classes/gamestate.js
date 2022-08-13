class GameState {
  static loader;
  static gems = [];
  static listOfObs = [];
  static lockScreen = false;
  static selectedObjects = [];
  static checkPoints = [];
  static async loadGems() {
    return new Promise(async (resolve) => {
      await GameState.loadModels("gem");
      await GameState.loadModels("gem2");
      await GameState.loadModels("gem3");
      resolve(GameState.gems);
    });
  }
  static getListOfEmptyObs() {
    return GameState.listOfObs.filter((v) => {
      return !(typeof v.type === "number" || v.type == "done");
    });
  }
  static getListOfObsDone() {
    return GameState.listOfObs.filter((v) => v.type === "done");
  }
  static loadModels(name) {
    return new Promise((resolve) => {
      loader.load(
        `./3dmodels/${name}.glb`,
        //"https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf",
        function (data) {
          var object = data.scene;
          GameState.gems.push(object);
          resolve(GameState.gems);
        }
      );
    });
  }
}
