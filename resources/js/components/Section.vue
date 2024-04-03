<template>
    <!-- <Splitter style="height: 300px">
      <SplitterPanel :size="25" :minSize="10">
        <h1>En Attente</h1>
        <div
          class="todo"
          @drop.prevent="onDrop($event, 'todo')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div
            draggable="true"
            v-for="item in getList('todo')"
            @dragstart="startDrag($event, item)"
            :key="item.id"
          >
            {{ item.name }}
            <span class="delete-btn">X</span>
          </div>
        </div>
      </SplitterPanel>
  
      <SplitterPanel :size="25">
        <h1>En cours</h1>
        <div
          class="inprogress"
          @drop.prevent="onDrop($event, 'inprogress')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div
            draggable="true"
            v-for="item in getList('inprogress')"
            @dragstart="startDrag($event, item)"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </SplitterPanel>
  
      <SplitterPanel :size="25">
        <h1>Terminer</h1>
        <div
          class="completed"
          @drop.prevent="onDrop($event, 'completed')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div
            draggable="true"
            v-for="item in getList('completed')"
            @dragstart="startDrag($event, item)"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </SplitterPanel>
    </Splitter> -->
  </template>
  
  <script setup>
    import axios from "axios";
    // import Splitter from "primevue/splitter";
    // import SplitterPanel from "primevue/splitterpanel";
    import { onMounted, ref } from "vue";
  
    const items = ref([]);

    onMounted(async()=>{
        // const token = localStorage.getItem('authToken');
        const token = "7|bwYZETbSadqFlJvmwYS8BAQpEYgvGZWLpjdzP3xmd76d9ae8"
        const response = await axios.get('api/v1/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        items.value = response.data.data;
    })
    
    const getList = (list) => {
        return items.value.filter((item) => item.stat == list);
    };
    
    const startDrag = (event, item) => {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("itemId", item.id);
    };
    
    const onDrop = (event, list) => {
        const itemId = event.dataTransfer.getData("itemId");
        const item = items.value.find((item) => item.id == itemId);
        console.log(item);
        // item.stat = list;
        changeStat(item.list)
    };

    const changeStat = (item,list) => {

    }

  </script>
  
<style scoped>
    h1 {
        font-size: 1rem;
        border-bottom: solid 1px rgb(15, 67, 15);
        width: 100%;
        height: 16%;
    }

    .p-splitter {
        display: flex;
        justify-content: center;
    }

    .p-splitter-panel {
        flex-wrap: wrap;
    }

    div[draggable] {
        width: 100%;
        background: cyan;
        border-radius: 10px;
        margin-bottom: 5px;
        height: 5rem;
        cursor: pointer;
    }
    div[draggable]:hover {
        box-shadow: 4px 4px 4px 0px #000000;
    }
    .completed,.todo,.inprogress{

        width: 100%;
        height: 100%;
    }

</style>