export default class Piece {
  constructor(player, iconUrl, value, type) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
    this.value = value;
    this.type = type;
  }

  getPlayer() {
    return this.player;
  }
}
