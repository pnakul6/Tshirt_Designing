import React,{useRef} from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'

import state from '../store';

const CameraRig = ({children}) => {
    const group = useRef();
    const snap =useSnapshot(state);

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <=600;

        //setting the initial position of model
        let targetPostion =[ -0.4,0,2];
        if(snap.intro){
            if(isBreakpoint) targetPostion = [-0.4,0.3,3.8];
            if(isMobile) targetPostion= [0,0.6,4.5];
        }else{
            if(isMobile) targetPostion = [0,0,2.5];
            else{
                targetPostion = [0,0,2];
            }
        }
        //model camera position
        easing.damp3(state.camera.position, targetPostion, 0.3,delta)

        //to set the model rotation smoothly
        //delta is difference between 2 frames and we get it through useFrame hook
        easing.dampE(
            group.current.rotation,
            [state.pointer.y/10, -state.pointer.x/5, 0],
            0.25,
            delta
        )
    })

  return (
    <group ref={group} >
            {children}
    </group>
    )
}

export default CameraRig