const LS_KEY = "intro_completed";

export function getIntroCompleted() {
  const item = localStorage.getItem(LS_KEY);

  if (item === "true") {
    return true;
  }

  return false;
}

export function completeIntro() {
  localStorage.setItem(LS_KEY, "true");
}
