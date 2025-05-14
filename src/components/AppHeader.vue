<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.svg" alt="Exante Logo" />
      </div>
      <h1>Exante Take-Home Assignment</h1>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  width: 100%;
  padding: 1rem;
  background-color: var(--vt-c-primary);
}

.logo {
  display: block;
  margin: 0 auto 1.5rem;
}

h1 {
  position: relative;
  margin: 0 auto;
  color: var(--vt-c-white);
  text-align: center;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0;
  }

  h1 {
    margin: 0;
    font-weight: 500;
  }
}
</style>
