<template>
  <div class="container">
    <div class="window" style="width: 90%; margin: 32px auto;">
      <div class="title-bar">
        <div class="title-bar-text">Olas dumme kundesystem, bygget av Bjørn Helge og hans kunstige venner</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <menu role="tablist">
          <li role="tab">
            <NuxtLink to="/">Søk etter kunder</NuxtLink>
          </li>
          <li role="tab">
            <NuxtLink to="/saved">Lagrede kunder</NuxtLink>
          </li>
        </menu>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template> 