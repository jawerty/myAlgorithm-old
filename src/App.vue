<template>
  <div class="app">
    <Header @updatePage="updatePage"/>
    <div class="content">
      <AlgorithmList v-if="page == 'main'" />
      <CreateAlgorithm v-if="page == 'create'" />
    </div>
  </div>
</template>

<script>

import CreateAlgorithm from './components/CreateAlgorithm';
import AlgorithmList from './components/AlgorithmList';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    CreateAlgorithm,
    AlgorithmList,
    Header
  },
  data() {
    return {
      page: 'main'
    }
  },
  methods: {
    updatePage(page) {
      this.page = page;
    }
  },

}


</script>

<style>
body {
  width: 360px;
}

.algorithm-list {
  border-bottom: 1px solid rgb(200,200,200);
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
