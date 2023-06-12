import { MotiView } from "moti";
import { Center } from "native-base";
import { useEffect, useState } from "react";

const Colors = [
    '#22c55e', '#78716c', '#10b981',
    '#64748b', '#14b8a6', '#0ea5e9',
    '#f59e0b', '#eab308', '#06b6d4',
    '#a855f7', '#8b5cf6', '#737373',
    '#0077e6', '#a1a1aa', '#84cc16',
    '#ef4444', '#f43f5e', '#ec4899',
    '#6b7280', '#3b82f6', '#6366f1',
    '#f97316', '#71717a', '#d946ef'
]

const LoadingSpinner = ({ size }) => {
    const [color, setColor] = useState(Colors[0])

    useEffect(() => {
        // console.log(Object.values(colors).map(color => color["500"]).filter(color => color != undefined))

        const timer = setInterval(() => {
            const idx = Colors.findIndex(c => c == color);
            setColor(Colors[(idx + 1) % Colors.length])
        }, 2000);

        return () => clearInterval(timer);
    }, [color])


    return (
        <Center flex={1} bgColor={'white'} _dark={{
            bgColor: 'dark.50'
        }}>
            <MotiView
                from={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 0,
                    shadowOpacity: 0.5
                }}
                animate={{
                    width: size + 20,
                    height: size + 20,
                    borderRadius: (size + 20) / 2,
                    borderWidth: size / 10,
                    shadowOpacity: 1
                }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                    loop: true,
                }}
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: size / 10,
                    borderColor: color,
                    shadowColor: '#fff',
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                }}
            />
        </Center>
    )
}

export default LoadingSpinner;