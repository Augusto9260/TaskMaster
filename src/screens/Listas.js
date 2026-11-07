import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage  from "@react-native-async-storage/async-storage";

export default function Listas({ route }){
  const [ tarefas, setTarefas ] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const insets = useSafeAreaInsets();
  const { folderId, folderName } = route.params;
  const storageKey = `@taskmaster_lista_${folderId}`;

  // Chama essas funções ao iniciar o app
  useEffect(() => {
    carregarDados();
  },[]);

  //Salvar Dados
  useEffect(() => {
    async function salvarDados(){
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(listaTarefas));
      } catch (error) {
        console.log('Error ao salvar dados',error)
      }
    }
    salvarDados();
  },[listaTarefas]);
  //Carregar dados ao iniciar o app
  async function carregarDados(){
    try {
      const dados = await AsyncStorage.getItem(storageKey);
      if (dados){
        setListaTarefas(JSON.parse(dados));
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Marca a tarefa como finalizada
  function finalizada(key){
    try {
      const novaLista = listaTarefas.map(item => {
        if(item.key === key){
          return {...item, concluida: !item.concluida};
        }
        return item;
      })
      setListaTarefas(novaLista)
    } catch (error) {
      console.log(error)
    }
  }
  function addTarefas(){
    try {
      if(tarefas.trim() !== ''){
        const novaLista = {
          key: Math.random().toString(36).substring(2, 10),
          tarefas: tarefas,
          concluida: false,
        };
        setListaTarefas([novaLista,...listaTarefas]);
        setTarefas('');
        Keyboard.dismiss();
      }
      } catch (error) {
        console.log(error)
      }
    }
    async function excluirTarefa(key){
      try{
        const NovaListaTarefas = listaTarefas.filter(item => item.key !== key);
        setListaTarefas(NovaListaTarefas)
    }catch(erro){
      console.log(erro)
    }
  }
  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      <View>
        <Text style={styles.titulo}>{folderName}</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput value={tarefas} style={styles.input} 
          onChangeText={setTarefas}
          onSubmitEditing={addTarefas}/>
        <TouchableOpacity style={styles.botaoMais} onPress={addTarefas} >
          <Text style={styles.texto}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewLista} >
        <FlatList 
          data={listaTarefas} renderItem={({item}) => 
          <View style={styles.viewBotao}>
            <TouchableOpacity style={styles.botaoLista} >
              <Text style={styles.tarefas}>{item.tarefas}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => finalizada(item.key)} style={styles.botaoVisto} >
              <Image source={item.concluida ? require('./../assets/marca-de-verificacao.png') : null } 
               style={styles.visto} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirTarefa(item.key)} >
              <Image source={require('./../assets/excluir-logo.png')} style={styles.logoExcluir} />
            </TouchableOpacity>
          </View>}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007575',
  },
  titulo: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 32,
  },
  texto: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    borderWidth: 1,
    borderColor: '#fff',
    flex:1,
    height: 48,
    margin: 5,
    padding: 8,
    color: '#fff',
    borderRadius: 5,
  },
    botaoMais:{
    margin: 4,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    borderRadius: 5,
    width: 48,
    height: 48,
  },
  logoExcluir:{
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  tarefas:{
    flex: 1,
    fontSize: 26,
    color: "#fff",
  },
  viewLista: {
    flex: 1,
  },
  viewBotao:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 6,
    paddingRight: 16,
  },
    botaoVisto:{
    width: 32,
    height: 32,
    marginLeft: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#004d4d"
  },
  visto: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  botaoLista: {
    flex: 1,
    padding: 5,
    marginRight: 5,
    backgroundColor: '#004d4d',
    borderWidth: 1,
    borderColor: '#00ffff',
    borderRadius: 6,
    elevation: 6,
  }
});