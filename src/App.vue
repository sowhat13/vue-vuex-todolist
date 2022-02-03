<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style lang="scss">
* {
box-sizing: border-box;
padding: 0;
margin: 0;
scroll-behavior: smooth;
font-family: Arial, Helvetica, sans-serif;
}

button{
  cursor: pointer;

}
input{
  cursor: pointer;

}
label{
  cursor: pointer;

}
.app{
  width: 100%;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  background: rgb(204, 204, 204);
}


//all

.bg-warning {
  background: rgb(230, 157, 23);
}

.bg-error {
  background: rgb(241, 75, 63);
}


.bg-success {
  background: rgb(139, 212, 30);
}

.cl-light {
  color: whitesmoke;
}

.cl-error {
  color: rgb(206, 72, 31);
}

</style>
