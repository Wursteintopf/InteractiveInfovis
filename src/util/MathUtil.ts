export const convertAngleAndLengthToCoordinates: (angle: number, length: number) => [x: number, y: number] = (angle, length) => {
  return [Math.cos(angle * Math.PI / 180) * length, Math.sin(angle * Math.PI / 180) * length]
}
