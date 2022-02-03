<template>
  <div class="todo-list">
    <div class="todo-list-title">Todo List</div>
    <div class="todo-list-add">
      <div class="todo-list-add-title" :class="isError ? 'cl-error' : ''">
        {{ todoMessage }}
      </div>

      <div class="todo-list-add-elements">
        <input
          class="todo-list-input"
          placeholder="Yeni Todo"
          v-model="newTodo.message"
          @keyup.enter="addTodo(newTodo)"
        />
        <button
          class="todo-list-button bg-success cl-light"
          @click="addTodo(newTodo)"
        >
          Ekle
        </button>
        <button
          class="todo-list-button bg-warning cl-light"
          @click="newTodo.message = ''"
        >
          Sıfırla
        </button>
      </div>
    </div>
    <div ref="todolistRef" class="todo-list-elements todos-scrollbar">
        <div class="todo-tools cl-light">
            <div class="todo-tools-total">
             <input type="checkbox" v-model="isSelectAll" id="todo-select-all-checkbox"> <label for="todo-select-all-checkbox"> Hepsini Seç </label>
             </div> 
             <div class="todo-tools-total ">
( {{selectedTodos.length}} / {{todos.length}} )
             </div>
             <button
          class="todo-tools-button bg-error cl-light"
          @click="deleteSelectedTodos()"
        >
       Seçileni Sil
        </button>
        </div>
      <Todo
        v-for="(todo, index) in todos"
        :key="index"
        :data="todo"
        :index="index"
        @deleteTodo="deleteTodo($event)"
      ></Todo>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo.vue";

export default {
  data() {
    return {
      newTodo: {
        message: "",
        isSelected:false,
      },
      todoMessage: "Yeni Todo",
      isError: false,
      isSelectAll:false,
    };
  },

  computed: {
    todos: {
      get() {
        return this.$store.state.todos;
      },
      set(value) {
        this.$store.commit("updateMessage", value);
      },
    },

    selectedTodos:function(){
        return this.todos.filter((el) => {return el.isSelected == true})
    }
  },

  components: {
    Todo,
  },

  methods: {
    addTodo(nt) {
      if (nt.message.length > 0) {
        let newTodo = { ...nt };
        newTodo.id = this.$store.state.idCount;
        this.todos.push(newTodo);
    this.$nextTick(function() {
        var container = this.$refs.todolistRef;
        container.scrollTop = container.scrollHeight + 120;
      });

        this.$store.commit("incrementId");
        this.newTodo.message = "";
      } else {
        this.todoMessage = "Lütfen bir mesaj giriniz!";
        this.isError = true;

        setTimeout(this.endError, 1000);
      }
    },

    endError() {
      this.isError = false;
      this.todoMessage = "Yeni Todo";
    },

    deleteTodo(id) {
      this.todos.splice(
        this.todos.findIndex((e) => e.id === id),
        1
      );
    },


    deleteSelectedTodos(){
        if(this.selectedTodos.length > 0){
            this.selectedTodos.forEach((el) => {
                console.log(el.id);
                this.deleteTodo(el.id)
            })
        }else {
        this.todoMessage = "Lütfen todo seçiniz!";
        this.isError = true;

        setTimeout(this.endError, 1000);
      }
    }
  },

  watch: {
    todos: {
      handler() {
     console.log('lalaland');

     if(this.todos.length < 1){
         this.isSelectAll = false
     }
      },
      deep: true,
    },

    isSelectAll:{
          handler() {
       if(this.isSelectAll == true && this.todos.length > 0){
            this.todos.forEach((el) => {
                console.log(el);
                el.isSelected = true
            })
        }else if(this.isSelectAll == false){
   this.todos.forEach((el) => {
                console.log(el);
                el.isSelected = false
            })
        }
      },
      
    }
  },
};
</script>

<style scoped lang="scss">
.todo-list {
  background: rgb(105, 208, 221);
  width: 480px;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px;
  border-radius: 50px;
  box-shadow: 0px 0px 24px 4px rgba(0, 0, 0, 0.3),
    0px 0px 4px 2px rgba(0, 0, 0, 0.1) inset,
    0px 0px 16px 4px rgba(0, 0, 0, 0.1) inset,
    0px 0px 16px 6px rgba(0, 0, 0, 0.1) inset,
    0px 0px 16px 12px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
}

.todo-list-title {
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding: 24px;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px black;
}

.todo-list-add {
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;

  * {
    padding: 4px;
  }
}

.todo-list-add-title {
  transition: ease-in-out 0.3s;
}

.todo-list-add-elements {
  display: flex;
  width: 100%;
  * {
    margin: 4px;
  }
}
.todo-list-input {
  display: flex;
  width: 100%;
  height: 36px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  padding: 12px;
}
.todo-list-button {
  width: 64px;
  height: 36px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-weight: bold;
}


.todo-list-button:hover{
  opacity: 0.7;
}

.todo-list-button:active{
  transform: scale(0.95);
}

.todo-list-elements {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
}

.todo-tools{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 100%;
  padding: 12px 24px ;
  background: rgba(0, 0, 0, 0.05);
  box-shadow:0px 2px 0px 1px rgba(255, 255, 255, 0.1) ;
  align-items: center;
  *{
      margin:auto
  }
}

.todo-tools-button{
      width: 84px;
  height: 36px;
  border: none;
  outline: none;
  border-radius: 6px;
  font-weight: bold;
}

.todos-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.todos-scrollbar::-webkit-scrollbar {
  width: 6px;

  background-color: #ff424200;
}

.todos-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(101, 205, 219)),
    color-stop(0.72, rgb(109, 229, 238)),
    color-stop(0.86, rgb(96, 212, 212))
  );
}
</style>
