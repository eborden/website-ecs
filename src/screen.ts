export const screen = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener("resize", (_e) => {
  screen.width = window.innerWidth
  screen.height = window.innerHeight
});

window.addEventListener("onload", (_e) => {
  screen.width = window.innerWidth
  screen.height = window.innerHeight
});
