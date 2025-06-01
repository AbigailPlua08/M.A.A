<template>
  <div>
    <header class="top-bar">
      <img src="@/assets/Imagen1.jpg" class="logo" alt="Logo" />
    </header>

    <h1 class="title">Login del Psicólogo</h1>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <input v-model="codigo" type="text" placeholder="Código único" required />
      <button type="submit">Iniciar sesión</button>
    </form>

    <p v-if="!esExito && mensaje" class="error">{{ mensaje }}</p>
    <p v-if="esExito && mensaje" class="success">{{ mensaje }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { db } from '@/services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '@/assets/main.css'; 

export default defineComponent({
  name: 'LoginPsicologo',
  setup() {
    const email = ref('');
    const password = ref('');
    const codigo = ref('');
    const mensaje = ref('');
    const esExito = ref(false);

    const login = async () => {
      mensaje.value = '';
      esExito.value = false;

      try {
        const psicologosRef = collection(db, 'psicologos');
        const q = query(
          psicologosRef,
          where('email', '==', email.value),
          where('contraseña', '==', password.value),
          where('codigo_unico', '==', codigo.value)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const nombres = doc.data().nombres || 'Psicólogo';
          mensaje.value = `Bienvenido/a, ${nombres}!`;
          esExito.value = true;
        } else {
          mensaje.value = 'Credenciales incorrectas. Intente de nuevo.';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        mensaje.value = 'Ocurrió un error. Intente más tarde.';
      }
    };

    return {
      email,
      password,
      codigo,
      login,
      mensaje,
      esExito
    };
  }
});
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
