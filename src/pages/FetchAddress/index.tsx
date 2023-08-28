import React, { useEffect, useState } from 'react'

import axios from 'axios'

import {
    FieldInput,
    FieldText,
    FieldContainer,
    HeaderText,
    ContainerScrollView,
    TextMessageError,
  } from './styles'
import { View} from 'react-native'


export function FetchAddress() {
    const [cep, setCep] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')

    const [isValidAddress, setIsValidAddress] = useState(false)
    const [messageError, setMessageError] = useState('')

    useEffect(() => {
        const loadAddress = async () => {
          try {
            const { data } = await axios.get(
              `https://viacep.com.br/ws/${cep}/json/`
            )
    
            setStreet(data.logradouro)
            setNumber('')
            setComplement('')
            setState(data.uf)
            setCity(data.localidade)
            setNeighborhood(data.bairro)

            setIsValidAddress(true)
            setMessageError('')
    
            if (data.erro) {
    
              setIsValidAddress(false)
              setMessageError('Digite um cep válido')
            }
          } catch (error) {
    
            setIsValidAddress(false)
            setMessageError('Digite um cep válido')
          }
        }
    
        if (cep.length >= 8) {
          loadAddress()
        }
      }, [cep])

    return (
        <ContainerScrollView>
        <HeaderText>Buscar endereço</HeaderText>
        <FieldContainer>
            <FieldText>CEP: </FieldText>
            <FieldInput
            value={cep}
            onChangeText={setCep}
            placeholder="Digite seu CEP"
            keyboardType="numeric"
            />
        </FieldContainer>
        {isValidAddress && (
            <>
                <FieldContainer>
                    <FieldText>Rua: </FieldText>
                    <FieldInput editable={false} selectTextOnFocus={false} value={street} onChangeText={setStreet} />
                </FieldContainer>
                <FieldContainer>
                    <FieldText>Número: </FieldText>
                    <FieldInput value={number} onChangeText={setNumber} />
                </FieldContainer>
                <FieldContainer>
                    <FieldText>Complemento: </FieldText>
                    <FieldInput value={complement} onChangeText={setComplement} />
                </FieldContainer>
                <FieldContainer>
                    <FieldText>Estado: </FieldText>
                    <FieldInput editable={false} selectTextOnFocus={false} value={state} onChangeText={setState} />
                </FieldContainer>
                <FieldContainer>
                    <FieldText>Cidade: </FieldText>
                    <FieldInput editable={false} selectTextOnFocus={false} value={city} onChangeText={setCity} />
                </FieldContainer>
                <FieldContainer>
                    <FieldText>Bairro: </FieldText>
                    <FieldInput editable={false} selectTextOnFocus={false} value={neighborhood} onChangeText={setNeighborhood} />
                </FieldContainer>
            </>
        )}

        <View>
            <TextMessageError>{messageError}</TextMessageError>
        </View>
        </ContainerScrollView>

    )
}