<template>
  <li class="algorithm-block">
    <div 
      class="algorithm-block-item d-flex w-100 p-2 justify-content-between align-items-center" 
      :class="(algorithm.isLive) ? 'live' :  ''"
      @click="toggleView">
      <span>{{ algorithm.name }}</span>
      <div class="d-flex align-items-center">
        <div class="live-icon d-inline-block mr-2" :class="(algorithm.isLive) ? 'isLive ' : 'notLive'" @click="setLiveForm"></div>
        <font-awesome-icon v-if="algorithm.isLive" icon="clone" @click="toggleCloneForm" /></span>
        <font-awesome-icon v-if="!algorithm.isLive" icon="times" @click="removeAlgorithm" size="lg" /></span>
      </div>
    </div>
    <div v-if="showLiveForm">
      <b-form @submit="setLive">
        <b-button type="submit" variant="primary" class="w-100">Set Live</b-button>
      </b-form>
    </div>
    <div v-if="showCloneForm">
      <b-form @submit="cloneAlgorithm">
        <b-form-input
          id="input-1"
          v-model="form.newAlgoName"
          type="text"
          required
          class="mb-1"
          placeholder="New Algorithm Name"
        ></b-form-input>
        <b-button type="submit" variant="primary" class="w-100">Clone</b-button>
      </b-form>
    </div>
    <div class="algorithm-block-view p-2 d-none" ref="view">
      <div class="entities">
        <b-badge 
          v-for="entity in algorithm.entities.slice(0, showLimit)"
          class="entity-badge mr-1 mb-1 display-inline-block"
          :style="`border-color: ${entity.color}`">
          {{ entity.name }}
        </b-badge>
        <span v-if="algorithm.entities.length > showMoreDefault" class="algorithm-block__show-more" @click="showMore">Show {{ showMoreText }}</span>
      </div>
    </div>
    
  </li>
</template>

<script>
const showMoreText = "All";
const showLessText = "Less";

export default {
  name: 'AlgorithmBlock',
  props: {
    algorithm: {
      type: Object,
      required: true,
    }
  },
  data() {
    const showMoreDefault = 10;
    return {
      showMoreDefault,
      showLimit: showMoreDefault,
      showMoreText: showMoreText,
      showCloneForm: false,
      showLiveForm: false,
      form: {
        newAlgoName: ""
      }
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    showMore() {
      if (this.showLimit == this.showMoreDefault) {
        this.showLimit = this.algorithm.entities.length;
        this.showMoreText = showLessText;
      } else {
        this.showLimit = this.showMoreDefault;
        this.showMoreText = showMoreText;
      }
    },
    toggleView() {
      const view = this.$refs.view;
      if (view.classList.contains('d-none')) {
        view.classList.remove('d-none');
        view.classList.add('d-block');
      } else {
        view.classList.remove('d-block');        
        view.classList.add('d-none');        
      }
    },
    toggleCloneForm(event) {
      event.stopPropagation();
      this.showCloneForm = !this.showCloneForm;
    },
    cloneAlgorithm(event) {
      this.$emit('cloneAlgorithm', this.form.newAlgoName);
      return false;
    },
    setLiveForm(event) {
      if (this.algorithm.isLive) return;
      event.stopPropagation();
      this.showLiveForm = !this.showLiveForm;
    },
    async setLive(event) {
      const userGeneratedAlgos = await chromeStorage.getItem('user-generated-algos', []);
      userGeneratedAlgos = userGeneratedAlgos.map((algo) => {
        if (algo.name == this.algorithm.name) {
          algo.isLive = true;
        } else {
          algo.isLive = false;
        }
        return algo;
      });
      return false;
    },
    async removeAlgorithm(event) {
      event.stopPropagation();
      const userGeneratedAlgos = await chromeStorage.getItem('user-generated-algos', []);
      await chromeStorage.saveItem('user-generated-algos', userGeneratedAlgos.filter((algo) => {
        return (algo.name != this.algorithm.name);
      }));
      window.location.reload();
    }
  }
}


</script>

<style>
.algorithm-block-item {
  border-top: 1px solid rgb(200,200,200);
  background-color: rgb(130,131,126);
  color: #fff;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: bold;
}

.algorithm-block-item.live {
  background-color: rgb(150,220,0);
}

.algorithm-block-item:hover {
  opacity: .7;
  cursor: pointer;
}

.algorithm-block__show-more {
  font-size: 12px;
  font-weight: italic;
  font-family: sans-serif;
  cursor: pointer;
}
.badge.entity-badge {
  border-width: 5px;
  border-style: solid;
  background-color: #fff !important;
  border-radius: 10px !important;
  padding: 10px !important;
  font-size: 14px !important;
  color: rgb(130,131,126);
}
.live-icon {
  border-radius: 50%;
}
.live-icon.isLive {
  width: 10px;
  height: 10px;
  background-color: red;
  box-shadow: 0px 0px 4px 3px red;
  margin-right: 0.7rem !important;
}
.live-icon.notLive {
  width: 17px;
  height: 17px;
  background-color: #fff;
}
.font-size-icon {
  font-size: 20px !important;
}
</style>
