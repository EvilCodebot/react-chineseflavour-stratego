export default class Piece {
  constructor(player, iconUrl, value, selector) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
    this.value = value;
    this.selector = selector;
  }

  getPlayer() {
    return this.player;
  }
}
