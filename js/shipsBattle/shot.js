export const shot = (shotElement) => {
  if (
    shotElement.classList.contains("ship-red") ||
    shotElement.classList.contains("water")
  ) {
    return "Bad shot";
  }
  if (shotElement.classList.contains("ship-green")) {
    shotElement.classList.remove("ship-green");
    shotElement.classList.add("ship-red");
    return "Good shot";
  } else {
    shotElement.classList.add("water");
  }
};
