import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

const apiURL = 'http://localhost:3000'

const app = new Vue({
  el: '#app',
  data: {
    id: null,
    inputAge: null,
    inputName: null,
    friends: [],
    friend: null
  },
  methods: {
    // below is working
    getFriends() {
      fetch(`${apiURL}/friends`)
        .then(response => {
          return response.json()
        })
        .then((data) => {
          this.friends = data
        })
    },
    // working on below... might be best to have in another component
    // getFriend (_id) {
    //   fetch(`${apiURL}/friend/${_id}`)
    //     .then(response => {
    //       return response.json()
    //     })
    //     .then((data) => {
    //       this.friend = data
    //     })
    // },

    // below is working
    createFriend(friend) {
      console.log('createFriend:', { name: this.inputName, age: this.inputAge })
      // this.id = this.friends.length + 1
      fetch(`${apiURL}/friend`, {
        body: JSON.stringify({ name: this.inputName, age: this.inputAge }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
          console.log('res', res))
        .then(() => {
          this.inputName = null
          this.inputAge = null
          this.getFriends()
        })
        .then(() =>
          console.log('Created!!', friend))
    },

    // below is working
    updateFriend(friend) {
      console.log('updateFriend:', friend)
      fetch(`${apiURL}/friend/${friend._id}`, {
        body: JSON.stringify(friend),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          this.id = null
        })
    },

    // below is working
    deleteFriend(friend) {
      console.log('deleteFriend:', friend)
      fetch(`${apiURL}/friend/${friend._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res =>
          console.log(res))
        .then(() => {
          this.getFriends()
        })
        .catch(err =>
          console.log(err))
    },

    cancel(friend) {
      this.id = null
      this.inputName = null
      this.inputAge = null
      this.getFriends()
    }
  },

  mounted() {
    this.getFriends()

  },

  template: `
<div>
    <ul>
        <li>
            <div>
                <li>Name: <input v-model="inputName"></input></li>
                <li>Age: <input v-model="inputAge"></input></li>
                <button v-on:click="createFriend(friend)">Create Friend</button>
            </div>
        </li>
        <hr>
        <hr>
        <li v-for= "friend, i in friends">
            <div v-if="id === friend._id">
            <hr>
            <li>ID: {{friend._id}}</li>
            <li>Name: <input v-model="friend.name" /> </li>
            <li>Age: <input v-model="friend.age" /> </li>
                <button v-on:click="updateFriend(friend)">save</button>
                <button v-on:click="cancel(friend)">cancel</button>
                <hr>
                <hr>
            </div>
            <div v-else>
            <li>ID: {{friend._id}}</li>
            <li>Name: {{friend.name}}</li>
            <li>Age: {{friend.age}}</li>
                <button v-on:click="id = friend._id">Edit</button>
                <button v-on:click="deleteFriend(friend)">X</button>
                <hr>
            </div>
        </li>
    </ul>
</div>
`
}
)
