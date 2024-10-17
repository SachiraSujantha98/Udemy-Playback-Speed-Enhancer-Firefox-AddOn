(function () {
  function addCustomSpeedsToMenu() {
    const speedMenu = document.querySelector(
      ".ud-unstyled-list.ud-block-list.playback-rate--menu--4b1Qm"
    );
    if (!speedMenu) return;

    // Check if custom speeds are already added
    const existingSpeeds = Array.from(speedMenu.querySelectorAll("button")).map(
      (button) => parseFloat(button.textContent)
    );
    const newSpeeds = [2.5, 3.0, 3.5, 4.0];

    newSpeeds.forEach((speed) => {
      if (!existingSpeeds.includes(speed)) {
        const li = document.createElement("li");
        li.setAttribute("role", "none");

        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("role", "menuitemradio");
        button.setAttribute("tabindex", "-1");
        button.setAttribute("aria-checked", "false");
        button.className =
          "ud-btn ud-btn-large ud-btn-ghost ud-text-sm ud-block-list-item ud-block-list-item-small ud-block-list-item-neutral";

        const div = document.createElement("div");
        div.className = "ud-block-list-item-content";

        const span = document.createElement("span");
        span.className = "ud-text-bold";
        span.textContent = speed + "x";

        div.appendChild(span);
        button.appendChild(div);

        button.addEventListener("click", () => {
          const video = document.querySelector("video");
          if (video) {
            video.playbackRate = speed;
          }

          // Update aria-checked attributes
          const buttons = speedMenu.querySelectorAll("button");
          buttons.forEach((btn) => btn.setAttribute("aria-checked", "false"));
          button.setAttribute("aria-checked", "true");

          // Update the displayed speed in the control bar
          updateDisplayedSpeed(speed);
        });

        li.appendChild(button);
        speedMenu.appendChild(li);
      }
    });
  }

  function updateDisplayedSpeed(speed) {
    const speedDisplay = document.querySelector(
      ".ud-focus-visible-target.playback-rate--trigger-text--l7hqr"
    );
    if (speedDisplay) {
      speedDisplay.textContent = speed + "x";
    }
  }

  function handleVideoChange() {
    // Observe changes to the playback rate menu
    const observer = new MutationObserver((mutations, obs) => {
      const speedMenu = document.querySelector(
        ".ud-unstyled-list.ud-block-list.playback-rate--menu--4b1Qm"
      );
      if (speedMenu) {
        addCustomSpeedsToMenu();
        obs.disconnect(); // Stop observing once we’ve modified the menu
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Observe for video element changes
  const videoObserver = new MutationObserver(() => {
    const video = document.querySelector("video");
    if (video) {
      handleVideoChange(); // Call function when video changes
    }
  });

  videoObserver.observe(document.body, { childList: true, subtree: true });
})();
