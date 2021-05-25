<template>
  <div id="home">
    <div id="notifications">
      <span id="title">Notificações</span>
      <div class="message" v-for="message in messages" :key="message.id">
        <span style="font-weight: bold">{{ message.title }}</span>
        <span>{{ message.body }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: undefined,
      current_token: undefined,
      messages: [],
    };
  },
  methods: {
    sendNotification() {},
    async getToken() {
      try {
        const token = await this.$messaging.getToken({
          vapidKey:
            "BCnOmqMIBKkpX2ucq2pDP2NKPt3VaFkJYfBdzKDTEC2s0HAlWqdHi2BmRKBXxfh7AR_Z3e_JbRhirjD8_xMw4tE",
        });
        if (token) {
          this.current_token = token;
          this.saveToken(token)
          console.log("Token:", token);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
      }
    },
    async saveToken(token) {
      const uid = this.generateUid();
      this.$database.ref("vapidKeys/" + uid).set(token);
      console.log("Token saved - UID:", uid, "Token:", token);
      this.saveLocalToken(token)
    },
    async saveLocalToken(token) {
      localStorage.setItem("token", token)
    },
    generateUid() {
      let uid = localStorage.getItem("uid");
      if(!uid) {
        uid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
        localStorage.setItem("uid", uid)
      }
      return uid;
    }
  },
  mounted() {
    console.log("Firebase cloud messaging object", this.$messaging);
    this.getToken();

    navigator.serviceWorker.addEventListener("message", (event) => {
      const payload = event.data;
      console.log(event)
      if (!payload.backgroundMessage) {
        this.messages.push({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      }
    });
  },
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  border-left-style: solid;
  border-color: blue;
  margin-bottom: 5px;
}

#home {
  display: flex;
  flex-direction: column;
}

#title {
  padding: 10px 0;
}

#notifications {
  width: 450px;
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: aqua;
}
</style>