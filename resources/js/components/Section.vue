<template >
    <Splitter style="height: 300px">
        <SplitterPanel  :size="25" :minSize="10"> 
            <h1>En Attente</h1>
        </SplitterPanel>
        <SplitterPanel  :size="25"> 
            <h1>En cours</h1>
        </SplitterPanel>
        <SplitterPanel  :size="25"> 
            <h1>Terminer</h1>
        </SplitterPanel>
    </Splitter>
</template>


<script setup>
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';

    const lists = [
        {id:1, name:'test1',text:'test'},
        {id:2, name:'test2', text:'test2'},
        {id:3, name:'test3', text:'test3'},
    ];
</script>


<style scoped>
h1{
    font-size: 1rem;
    border-bottom: solid 1px rgb(15, 67, 15);
    width: fit-content;
}
.p-splitter{
    display: flex;
    justify-content: center;
}
</style>