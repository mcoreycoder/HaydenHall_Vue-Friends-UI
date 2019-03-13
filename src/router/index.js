import Vue from 'vue'
import Router from 'vue-router'
// import VeeValidate from 'vee-validate'


Vue.use(Router)

const apiUrl = "http://localhost:3000/friends"
const app = new Vue({
  el: '#app',
  data: {
    delFriend: null,
    makeFriend: null,
    editFriend: null,
    idFriend: null,
    friends: []
  },
  methods: {
    deleteFriend(event) {
        fetch(`${apiUrl}/_id`, {
            method: "DELETE"
        })
        .then(() => {
            this.getFriends()
        })
        .then(() => {
            console.log("Deleted")
        })
    },

    getFriends() {
        fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            this.friends = data;
        })
    },
    updateFriend(event) {
        fetch(apiUrl, {
            body: JSON.stringify(event),
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                this.editFriend = null;
            })
    },
    createFriend(event) {
        fetch(apiUrl, {
            body: JSON.stringify({name : this.editFriend, age : this.makeFriend}),
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
        })
            .then(() => {
                this.editFriend = null;
            })
            .then(() => {
                this.makeFriend = null;
            })
            .then(() => {
                this.getFriends()
            })
            .then(() => {
                console.log("Created!!", event)
            })
    },
},
mounted() {
    this.getFriends()
},

template: `
<div>
    <ul>
        <li>
            <div>
                <li>Name: <input v-model="editFriend"></input></li>
                <li>Age: <input v-model="makeFriend"></input></li>
                <button v-on:click="createFriend">Create Friend</button>
            </div>
        </li>
        <li v-for= "friend, i in friends">
            <div v-if="editFriend === friend.id">
                <input v-model="friend.name" />
                <button v-on:click="updateFriend(friend)">save</button>
            </div>
            <div v-else>
            <li>Name: {{friend.name}}</li>
            <li>Age: {{friend.age}}</li>
                <button v-on:click="editFriend = friend.id">Edit</button>
                <button v-on:click="deleteFriend" name= {{friend._id}}>X</button>
            </div>
        </li>
    </ul>
</div>
`
})