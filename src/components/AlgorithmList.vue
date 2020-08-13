<template>
  <ul class="algorithm-list">
    <template v-if="algorithm.entities" v-for="(algorithm, i) in algorithms">
      <AlgorithmBlock
        :algorithm="algorithm"
        :key="i"
        @cloneAlgorithm="cloneAlgorithm" 
      />
    </template>
  </ul>
</template>

<script>
import AlgorithmBlock from './AlgorithmBlock';

export default {
  name: 'AlgorithmList',
  props: {
  },
  components: {
    AlgorithmBlock
  },
  async mounted() {
    const liveEntities = await chromeStorage.getItem('live-entities', {});
    
    const userGeneratedAlgos = await chromeStorage.getItem('user-generated-algos', []);
    let algorithmEntities = this.algorithms.concat(userGeneratedAlgos);
    algorithmEntities = algorithmEntities.map((algorithm) => {
      console.log(algorithm);
      if(algorithm.isLive) {
        algorithm.entities = liveEntities;
      }

      const sortedEntities = Object.keys(algorithm.entities).sort((e1, e2) => {
        return algorithm.entities[e2] - algorithm.entities[e1];
      });
      const maxMin = this.getMaxMin(algorithm.entities);
      const finalEntities = sortedEntities.map((entity) => {
        return {
          name: entity,
          color: this.getEntityColor(
            algorithm.entities[entity], 
            maxMin
          )
        }
      });

      algorithm.entities = finalEntities;
      return algorithm;
    });

    this.algorithms = algorithmEntities;
  },
  data() {
    return {
      algorithms: [
        { name: 'Live', isLive: true }
      ]     
    };
  },
  methods: {
    getMaxMin(obj) {
      let max, min;
      Object.keys(obj).forEach((key) => {
        const amount = obj[key];
        if (!max && !min) {
          max = min = amount;
        } else {
          if (amount > max) {
            max = amount;
          }
          if (amount < min) {
            min = amount;
          }          
        }
      });
      return { max, min };
    },
    getEntityColor(entityAmount, maxMin) {
      const colorPadding = 255 * ((entityAmount-maxMin.min) / (maxMin.max-maxMin.min));
      const R = 255; 
      const G = 255;
      const B = 255; // multiple variable definition not working here....
      return `rgb(${R}, ${G - colorPadding}, ${B - colorPadding})`;
    },
    async cloneAlgorithm(newAlgoName) {
      const liveEntities = await chromeStorage.getItem('live-entities', {});
      const userGeneratedAlgos = await chromeStorage.getItem('user-generated-algos', []);

      const clonedAlgo = {
        name: newAlgoName,
        isLive: false,
        entities: liveEntities
      };
      userGeneratedAlgos.push(clonedAlgo);

      await chromeStorage.saveItem('user-generated-algos', userGeneratedAlgos);
      window.location.reload();
    }
  }
}


</script>

<style>
.algorithm-list {

}
</style>
