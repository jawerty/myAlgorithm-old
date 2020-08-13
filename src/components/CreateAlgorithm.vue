<template>
  <div class="create-algorithm p-2">
  	<b-form @submit="onSubmit">
	  	<b-form-input
	      id="input-1"
	      v-model="form.name"
	      type="text"
	      required
	      class="mb-1"
	      placeholder="Enter Algorithm Name"
	    ></b-form-input>
	    <b-form-tags required v-model="form.tags" class="mb-1"></b-form-tags>
	    <b-button type="submit" variant="primary" class="w-100">Create Algorithm</b-button>
	</b-form>
  </div>
</template>

<script>

export default {
  name: 'CreateAlgorithm',
  props: {
    
  },
  data() {
  	return {
  	  form: {
        name: "",
        tags: []
      },
  	}
  },
  methods: {
  	async onSubmit() {
  		const { name, tags } = this.form;
  		if (!tags) {
  			return false
  		}
		const userGeneratedAlgos = await chromeStorage.getItem('user-generated-algos', []);
		const entities = {};
		tags.forEach((tag) => {
			entities[tag] = 1;
		});
		userGeneratedAlgos.push({
			name, entities, isLive: false
		});
      	await chromeStorage.saveItem('user-generated-algos', userGeneratedAlgos);
  		window.location.reload();
  		return false;
  	}
  }
}


</script>

<style>
.create-algorithm {

}

.form-control.focus,
.form-control:focus {
	box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25) !important; 
}
</style>
