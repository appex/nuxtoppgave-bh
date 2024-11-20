<template>
  <div class="window" style="width: 100%">
    <div class="title-bar">
      <div class="title-bar-text">Error</div>
    </div>
    <div class="window-body">
      <p>{{ error?.message || 'An error occurred' }}</p>
      <button @click="handleError">Go back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
});

const handleError = () => {
  clearError({ redirect: '/' });
};
</script> 