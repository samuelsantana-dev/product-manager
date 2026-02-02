
<template>
  <div>
    <nav class="bg-white shadow p-4 flex gap-4">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/gallery">Galeria</RouterLink>
      <RouterLink to="/import">Importar Planilha</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
