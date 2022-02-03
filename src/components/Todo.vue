<template>
  <div
    class="todo"
    :class="data.isSelected ? 'todo-selected' : ''"
    @click.self="data.isSelected = !data.isSelected"
  >
    <div class="todo-index" @click.self="data.isSelected = !data.isSelected">
      {{ index + 1 }}
    </div>
    <div
      v-if="!isEditing"
      class="todo-message"
      @click.self="data.isSelected = !data.isSelected"
    >
      {{ data.message }}
    </div>
    <div v-if="isEditing" class="todo-editing">
      <input v-model="editingData.message" />
      <button class="todo-button button-sm bg-success" @click="editTodoSuccess">Tamam</button>
      <button class="todo-button button-sm bg-error" @click="editTodo">
        İptal
      </button>
    </div>

    <div class="todo-buttons">
      <button class="todo-button bg-warning" @click="editTodo">Düzenle</button>
      <button
        class="todo-button bg-error cl-light"
        @click="deleteTodo(data.id)"
      >
        Sil
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      editingData: null,
    };
  },

  props: {
    data: Object,
    index: Number,
  },

  methods: {
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },

    editTodo() {
      this.editingData = { ...this.data }
      this.isEditing = !this.isEditing;
    },

    editTodoSuccess(){
      this.data.message = this.editingData.message
      this.isEditing = !this.isEditing;

    }
  },
};
</script>

<style scoped lang="scss">
.todo {
  display: grid;
  grid-template-columns: 10% 60% 30%;
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 2px 0px 1px rgba(255, 255, 255, 0.1);
  align-items: center;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.todo-selected {
  background: rgba(255, 255, 255, 0.3);
}

.todo-index {
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: auto;
}

.todo-message {
  padding: 2px 8px;
  display: flex;
  flex-wrap: wrap;
  word-break: break-word;
}

.todo-buttons {
  margin: auto;
}

.todo-button {
  min-width: 48px;
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 6px;
  font-weight: bold;
  margin: 2px 4px;
}

.button-sm {
  min-width: 36px;
  padding: 6px;

  font-size: 10px;
  cursor: pointer;
}

.todo-button:hover {
  opacity: 0.7;
}

.todo-button:active {
  transform: scale(0.95);
}
</style>
