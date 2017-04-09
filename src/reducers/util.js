function cloneTiles(tiles) {
  return tiles.map(rowTiles =>
    rowTiles.map(tile => ({ ...tile }))
  );
}

export {
  cloneTiles,
};