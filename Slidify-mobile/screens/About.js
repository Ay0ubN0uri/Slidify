import React, { useRef } from 'react'
import { Center, HStack, Heading, ScrollView, Text, useColorMode } from 'native-base';
import Layout from '../components/core/Layout';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


const About = () => {
    const animation = useRef(null);
    const { colorMode } = useColorMode();
    return (
        <Layout pt={8}>
            <ScrollView mb={2}>
                <Center mt={4} mb={12}>
                    <LottieView
                        style={{
                            width: Dimensions.get('window').width * 0.8,
                            height: Dimensions.get('window').width * 0.8,
                            alignSelf: 'center'
                        }}
                        ref={animation}
                        source={require('../assets/team.json')}
                        loop
                        autoPlay
                    />
                    <Heading fontStyle={'italic'} color={'blue.500'}>
                        SLIDIFY
                    </Heading>
                    <Text p={3} textAlign={'center'} letterSpacing={1} lineHeight={'lg'}>
                        Slidify is a powerful application designed to control PowerPoint presentations with ease. Whether you're giving a lecture, presenting a sales pitch, or showcasing your ideas, this app puts you in control of your slides right from your mobile device.
                    </Text>
                    <HStack alignItems={'center'} flexWrap={'wrap'}>
                        <FontAwesome5 name="copyright" size={24} color={colorMode == 'dark' ? 'white' : 'black'} />
                        <Text pl={1} letterSpacing={1} lineHeight={'lg'} >
                            All Rights Reverved, By <Text fontWeight={'bold'} color={'tertiary.500'}>Ayoub Nouri</Text>
                        </Text>
                    </HStack>
                </Center>
            </ScrollView>
        </Layout>
    )
}


export default About;