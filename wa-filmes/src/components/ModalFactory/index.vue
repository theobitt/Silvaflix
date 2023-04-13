<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Teleport to="body">
    <div v-if="state.isActive" class="modal" @click="handleModalToggle({ status: false })">
      <div class="modal-body" :class="state.width" @click.stop>
        <div class="modal-content">
          <div class="modal-component">
            <component :is="state.component" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
  
<script>
import { onBeforeUnmount, onMounted, reactive, defineAsyncComponent } from "vue";
import useModal from "@/hooks/useModal";
const ModalAddFilme = defineAsyncComponent(() => import("@/components/ModalAddFilme"));


const DEFAULT_WIDTH = "75%";

export default {
  components: { ModalAddFilme },

  setup() {
    const modal = useModal();
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH,
    });

    onMounted(() => {
      modal.listen(handleModalToggle);
    });

    onBeforeUnmount(() => {
      modal.off(handleModalToggle);
    });

    function handleModalToggle(payload) {
      if (payload.status) {
        state.component = payload.component;
        state.props = payload.props;
        state.width = payload.width ?? DEFAULT_WIDTH;
      } else {
        state.component = {};
        state.props = {};
        state.width = DEFAULT_WIDTH;
      }

      state.isActive = payload.status;
    }
    return {
      state,
      handleModalToggle,
    };
  },
};
</script>
  
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 1;
  align-content: center;
  justify-content: center;
}

.modal-body {
  position: fixed;
}

.modal-content {
  align-content: center;
  justify-content: center;
  flex-direction: column;
  /* overflow: hidden; */
  background-color: grey;
  border-radius: 10px;
  /* width: 520px;
    height: 250px; */
}

.modal-component {
  background-color: grey;
  border-radius: 10px;
  gap: 2vh;
}
</style>
  