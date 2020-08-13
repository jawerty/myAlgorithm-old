<template>
  <div class="header justify-content-between">
    <span></span>
    <span class="header-link" @click="$emit('updatePage', 'main')">myAlgorithm</span>
    <span class="header-link" @click="$emit('updatePage', 'create')"><font-awesome-icon icon="plus" /></span>
  </div>
</template>

<script>

export default {
  name: 'Header'
}


</script>

<style>
  .header {
    background-color: rgb(50,50,50);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header span {
    font-size: 16px;
    color: #fff;
  }

  .header-link {
    cursor: pointer;
  }
</style>
