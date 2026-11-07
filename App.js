import React, { useState, useEffect }  from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity, Keyboard, Image} from "react-native";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Listas from './src/screens/Listas';


function TaskMaster(){
  const [tarefas, setTarefas] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  // Chama essas funções ao iniciar o app
  useEffect(() => {
    carregarDados();
  },[])
  //Salvar Dados
  useEffect(() => {
    async function salvarDados(){
      try {
        await AsyncStorage.setItem('@taskmaster_pastas', JSON.stringify(listaTarefas));
      } catch (error) {
        console.log('Error ao salvar dados',error)
      }
    }
    salvarDados();
  },[listaTarefas]);
  //Carregar dados ao iniciar o app
  async function carregarDados(){
    try {
      const dados = await AsyncStorage.getItem('@taskmaster_pastas');
      if (dados){
        setListaTarefas(JSON.parse(dados));
      }
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
        const dados = await AsyncStorage.getItem('@taskmaster_pastas');
        const resultado = JSON.parse(dados)// conversão de string para array(vetores)
        const NovaListaTarefas = resultado.filter((item => {
          return item.key !== key
        }))
      setListaTarefas(NovaListaTarefas)
    }catch(erro){
      console.log(erro)
    }
  }
  return(
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.ViewFilho}>
        <StatusBar backgroundColor={"#000000"} barStyle={"light-content"} />
        <View style={styles.h1}>
          <Text style={styles.titulo}>TaskMaster</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput value={tarefas} style={styles.input}
          onChangeText={setTarefas}
          onSubmitEditing={addTarefas} />
          <TouchableOpacity style={styles.botao} 
          onPress={addTarefas} >
            <Text style={styles.botaoAdd}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewLista}>
          <FlatList style={{flex: 1}}
           data={listaTarefas} renderItem={({item}) => 
           <View style={styles.viewBotao}>
              <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Listas', {
                folderId: item.key,
                folderName: item.tarefas
              })}>
                <Text style={styles.tarefas}>{item.tarefas}</Text>
              </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirTarefa(item.key)} >
                  <Image source={require('./src/assets/excluir-logo.png')} style={styles.logoExcluir} />
                </TouchableOpacity>
              </View>}
            />
        </View>
      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home" component={TaskMaster} />
          <Stack.Screen name="Listas" component={Listas} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007575',
  },
  ViewFilho:{
    flex: 1,
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
    flex: 1,
  },
  viewBotao:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 6,
    paddingRight: 30,
  },
  tarefas:{
    flex: 1,
    fontSize: 26,
    color: "#fff",
    marginLeft: 4,
    marginRight: 8,
  },
  logoExcluir:{
    width: 32,
    height: 32,
    resizeMode: 'contain',
  }
})