Vue.component('todo-item', {
    props: ['title', 'isChecked', 'id'],
    template: `
        <li class="list-complete-item">
            <label v-bind:class="{ done: isChecked }">
                <input type="checkbox" v-model="childisChecked" v-on:change="deleteCheck">
                {{ title }}
            </label>
        </li>
    `,
    data() {
        return {
            childisChecked: this.isChecked
        }
    },
    methods: {
        deleteCheck() {
            this.$emit('delete', this.childisChecked, this.id)
        }
    }
})


let vm = new Vue({
    el: "#app",
    data: {
        items: [],
        newItemTitle: ''
    },
    methods: {
        updateCheck(childChecked, childIndex) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id === childIndex) {
                    this.items[i].isChecked = childChecked;
                    break;
                }
            }
            this.saveTodo();
        },
        addTodo(newItemTitle) {
            if (this.newItemTitle === '') {
                alert('Todoを入力してください')
                return
            }
            let date = Date.now();
            this.items.push({
                title: this.newItemTitle,
                isChecked: false,
                id: date
            });
            this.newItemTitle = '';
            this.saveTodo();
        },
        deleteTodo() {
            this.items = this.items.filter(function (item) {
            return item.isChecked === false;
            });
            this.saveTodo();
        },
        saveTodo() {
            localStorage.setItem('items', JSON.stringify(this.items));
        },
        loadTodo() {
            this.items = JSON.parse( localStorage.getItem('items'));
            if(!this.items) {
                this.items = [];
            }
        }
    },
    mounted() {
        this.loadTodo();
    }
})