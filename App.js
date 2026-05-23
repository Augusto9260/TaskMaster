import React, { useState, useEffect }  from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Image, Alert, Linking, useWindowDimensions} from "react-native";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import {version as APP_VERSION} from "./package.json";

export default function App(){
  const [tarefas, setTarefas] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const {height} = useWindowDimensions();
  // Verifica atualização
  async function checkUpdate(){
    try {
      const response = await fetch(`https://api.github.com/repos/Augusto9260/TaskMaster/releases/latest`);
      const data = await response.json();
      const latestVersion = data.tag_name;

      if(latestVersion !== `v${APP_VERSION}`){
        Alert.alert(
          "Atualização Disponivel",
          `Uma nova versão (${latestVersion}) foi encontrada. Deseja baixar?`,
          [
            {text: "Depois", style: "cancel"},
            {
              text: "Baixar",
              onPress: () => Linking.openURL(data.assets[0].browser_download_url)
            }
          ]
        )
      }
    } catch (error) {
      console.log("Não foi possivel verificar atualização", error);
    }
  }
  // Chama essas funções ao iniciar o app
  useEffect(() => {
    carregarDados();
    checkUpdate();
  },[])
  //Carregar dados ao iniciar o app
  async function carregarDados(){
    try {
      const dados = await AsyncStorage.getItem('@taskmaster_lista');
      if (dados){
        setListaTarefas(JSON.parse(dados));
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Salvar Dados
  useEffect(() => {
    async function salvarDados(){
      await AsyncStorage.setItem('@taskmaster_lista', JSON.stringify(listaTarefas));
    }
    salvarDados();
  }, [listaTarefas]);

  function addTarefas(){
    try {
      if(tarefas.trim() !== ''){
        const novaLista = {
          key: Math.random().toString(36).substring(2, 10),
          tarefas: tarefas,
          concluida: false,
        };
        setListaTarefas([...listaTarefas, novaLista])
        setTarefas('');
        Keyboard.dismiss();
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
  async function excluirTarefa(key){
    try{
      const dados = await AsyncStorage.getItem('@taskmaster_lista');
      const resultado = JSON.parse(dados)// conversão de string para array(vetores)

      const NovaListaTarefas = resultado.filter((item => {
        return item.key !== key
      }))

      setListaTarefas(NovaListaTarefas)

      await AsyncStorage.setItem('@taskmaster_lista', JSON.stringify(NovaListaTarefas))

      console.log(NovaListaTarefas)
    }catch(erro){
      console.log(erro)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#000000"} barStyle={"light-content"} />
      <View style={[styles.h1, {marginTop: height < 700 ? 0 : 30}]}>
        <Text style={styles.titulo}>TaskMaster</Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput value={tarefas} style={styles.input}
        onChangeText={setTarefas} />
        <TouchableOpacity style={styles.botao} 
        onPress={addTarefas} >
          <Text style={styles.botaoAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewLista}>
        <FlatList data={listaTarefas} renderItem={({item}) => 
          <View style={styles.viewBotao}>
            <Text style={styles.tarefas}>{item.tarefas}</Text>
            <TouchableOpacity style={styles.botaoLista} 
            onPress={() => finalizada(item.key)} >
              <Image style={styles.imageBotao} source={item.concluida && require('./src/assets/marca-de-verificacao.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirTarefa(item.key)} >
              <Image source={require('./src/assets/excluir-logo.png')} style={styles.logoExcluir} />
            </TouchableOpacity>
          </View>}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007575',
  },
  h1:{
    
  },
  titulo: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
  },
  botaoAdd:{
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  viewInput: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  botao:{
    margin: 4,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    borderRadius: 5,
    width: 48,
    height: 48,
  },
  viewLista:{
    
  },
  viewBotao:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  tarefas:{
    fontSize: 30,
    color: "#fff",
    flexShrink: 1,
    marginLeft: 4,
  },
  botaoLista:{
    width: 32,
    height: 32,
    marginLeft: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#009999"
  },
  imageBotao: {
    width: 32,
    height: 32,
  },
  logoExcluir:{
    width: 32,
    height: 32,
  }
})