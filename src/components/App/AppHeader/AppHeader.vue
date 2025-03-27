<template>
  <header class="app-header">
    <h1 class="app-header__title">
      <slot name="title" />
    </h1>

    <div class="app-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style lang="scss" scoped src="./AppHeader.scss" />
